using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly SQLinkDbContext _context;
        private readonly IConfiguration _config;

        public LoginController(SQLinkDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<IEnumerable<LoginResponse>> Login(LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!PasswordHasher.VerifyPassword(request.Password, user.Password))
            {
                return NotFound("wrong password");
            }

            var token = GenerateToken(user);

            var loginResponse = new LoginResponse
            {
                Token = token,
                PersonalDetails = new UserPersonalDetails
                {
                    Name = user.Name,
                    Team = user.Team,
                    JoinedAt = user.JoinedAt.ToString("yyyy-MM-dd"),
                    Avatar = user.Avatar
                }
            };

            var response = new List<LoginResponse>()
            {
                loginResponse
            };

            return Ok(response);
        }

        private string GenerateToken(User user)
        {
            //Generates a new token using algorithm HmacSha256
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}


