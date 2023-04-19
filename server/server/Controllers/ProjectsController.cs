using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using server;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ProjectsController : ControllerBase
    {
        private readonly SQLinkDbContext _context;
        private readonly IConfiguration _config;

        public ProjectsController(SQLinkDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet("projects")]
        public ActionResult<IEnumerable<Project>> GetProjectsForUser()
        {
            //Get token from header
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            //Validate the token to get the user email
            var userEmail = ValidateToken(token);

            var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);

            // if no user was found (or if the token was not valid) return Unauthorised
            if (user == null)
            {
                return Unauthorized();
            }

            //Get all the user's projects by userId
            var projects = _context.Projects.Where(p => p.UserId == user.Id).ToList();


            //Return an enumerable of projects without the userId
            var response = projects.Select(p => new Project
            {
                Id = p.Id,
                Name = p.Name,
                Score = p.Score,
                DurationInDays = p.DurationInDays,
                BugsCount = p.BugsCount,
                MadeDadeline = p.MadeDadeline
            });

            return Ok(response);
        }

        private string? ValidateToken(string? token)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            try
            {
                //validate the token
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userEmail = jwtToken.Claims.First(x => x.Type == ClaimTypes.Email).Value;

                // return user id from JWT token if validation successful
                return userEmail;
            }
            catch
            {
                // return null if validation fails
                return null;
            }
        }
    }

    
}


