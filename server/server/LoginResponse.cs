using System;
namespace server
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserPersonalDetails PersonalDetails { get; set; }
    }

    public class UserPersonalDetails
    {
        public string Name { get; set; }
        public string Team { get; set; }
        public string JoinedAt { get; set; }
        public string Avatar { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

