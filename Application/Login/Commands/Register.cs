using Application.Core;
using Domain.Core;
using Domain.Login;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Login.Commands;

public class Register
{
    public class Command : IRequest<UserDto>
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
    }

    public class Handler(AppDbContext context, TokenService tokenService) : IRequestHandler<Command, UserDto>
    {
        public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
        {
            if (await context.Users.AnyAsync(x => x.Login == request.Login, cancellationToken))
            {
                throw new Exception("Login already exists");
            }

            if (await context.Users.AnyAsync(x => x.Email == request.Email, cancellationToken))
            {
                throw new Exception("Email already exists");
            }

            var user = new User
            {
                Login = request.Login,
                Password = PasswordHasher.HashPassword(request.Password),
                Email = request.Email,
                Username = request.Username
            };

            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);

            return new UserDto
            {
                UserId = user.Id,
                Username = user.Username,
                Token = tokenService.CreateToken(user.Id, user.Username, user.Email),
                Email = user.Email
            };
        }
    }
}
