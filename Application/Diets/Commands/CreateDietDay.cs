using System;
using Domain.Diets;
using MediatR;
using Persistence;

namespace Application.Diets.Commands;

public class CreateDietDay
{
    public class Command : IRequest<string>
    {
        public required DietDay DietDay { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.DietDays.Add(request.DietDay);
            await context.SaveChangesAsync(cancellationToken);
            return request.DietDay.Id;
        }
    }

}
