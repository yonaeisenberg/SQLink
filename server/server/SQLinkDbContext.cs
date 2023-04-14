using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace server
{
    public class SQLinkDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=localhost;user=SA;password=password;database=SQLink;trusted_connection=false;TrustServerCertificate=True");
        }
    }

    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime JoinedAt { get; set; }
        public string Avatar { get; set; }
    }

    public class Project
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int DurationInDays { get; set; }
        public int BugsCount { get; set; }
        public bool MadeDadeline { get; set; }
    }
}


