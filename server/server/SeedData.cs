using System;
using System.Linq;
using server;

namespace server
{
    public static class SeedData
    {
        public static void Initialize(SQLinkDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                var users = new User[]
                {
                    new User { Email = "test1@test.com", Password = "Password123", Token = "1111-2222-3333-4444", Name = "Test 1", Team = "Developers", JoinedAt = DateTime.Parse("2018-10-01"), Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg" },
                    new User { Email = "test2@test.com", Password = "Password123", Token = "2222-3333-4444-5555", Name = "Test 2", Team = "Developers", JoinedAt = DateTime.Parse("2019-10-01"), Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg" },
                    new User { Email = "test3@test.com", Password = "Password123", Token = "3333-4444-5555-6666", Name = "Test 3", Team = "Developers", JoinedAt = DateTime.Parse("2020-10-01"), Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg" }
                };
                context.Users.AddRange(users);
            }

            context.SaveChanges();

            if (!context.Projects.Any())
            {

                var projects = new Project[]
                {
                    new Project { UserId = 1, Name = "Backend Project", Score = 88, DurationInDays = 35, BugsCount = 74, MadeDadeline = false },
                    new Project { UserId = 1, Name = "Design Project", Score = 92, DurationInDays = 40, BugsCount = 60, MadeDadeline = true },
                    new Project { UserId = 1, Name = "Backend Project", Score = 60, DurationInDays = 30, BugsCount = 80, MadeDadeline = false },
                    new Project { UserId = 2, Name = "Backend Project", Score = 88, DurationInDays = 35, BugsCount = 74, MadeDadeline = false },
                    new Project { UserId = 2, Name = "Design Project", Score = 92, DurationInDays = 40, BugsCount = 60, MadeDadeline = true },
                    new Project { UserId = 2, Name = "Backend Project", Score = 60, DurationInDays = 30, BugsCount = 80, MadeDadeline = false },
                    new Project { UserId = 3, Name = "Backend Project", Score = 88, DurationInDays = 35, BugsCount = 74, MadeDadeline = false },
                    new Project { UserId = 3, Name = "Design Project", Score = 92, DurationInDays = 40, BugsCount = 60, MadeDadeline = true },
                    new Project { UserId = 3, Name = "Backend Project", Score = 60, DurationInDays = 30, BugsCount = 80, MadeDadeline = false },

                };
                context.Projects.AddRange(projects);
            }

            context.SaveChanges();
        }
    }
}

