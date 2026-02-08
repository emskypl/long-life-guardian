namespace Domain.Login
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Login { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
    }
}
