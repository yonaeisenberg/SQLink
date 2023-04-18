using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SQLinkDbContext _context;

        public UserController(SQLinkDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public ActionResult<LoginResponse> Login(LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);

            if (user == null)
            {
                return NotFound();
            }

            var response = new LoginResponse
            {
                Token = user.Token,
                PersonalDetails = new UserPersonalDetails
                {
                    Name = user.Name,
                    Team = user.Team,
                    JoinedAt = user.JoinedAt.ToString("yyyy-MM-dd"),
                    Avatar = user.Avatar
                }
            };

            return Ok(response);
        }

        [HttpGet("projects")]
        public ActionResult<IEnumerable<Project>> GetProjectsForUser()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            var user = _context.Users.FirstOrDefault(u => u.Token == token);

            if (user == null)
            {
                return Unauthorized();
            }

            var projects = _context.Projects.Where(p => p.UserId == user.Id).ToList();

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
    }
}


