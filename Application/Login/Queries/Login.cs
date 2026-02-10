using Application.Common.Exceptions;
using Application.Core;
using Domain.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Login.Queries;

public class Login
{
    public class Query : IRequest<UserDto>
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
    }

    public class Handler(AppDbContext context, TokenService tokenService) : IRequestHandler<Query, UserDto>
    {
        public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(x => x.Login == request.Login, cancellationToken);

            if (user == null)
            {
                throw new UnauthorizedException("Invalid login or password");
            }

            if (!PasswordHasher.VerifyPassword(request.Password, user.Password))
            {
                throw new UnauthorizedException("Invalid login or password");
            }

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
