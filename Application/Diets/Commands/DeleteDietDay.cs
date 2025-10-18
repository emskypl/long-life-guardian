using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteDietDay
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var dietDay = await context.DietDays.FindAsync([request.Id], cancellationToken) ?? throw new Exception("Cannot find diet day");

            context.Remove(dietDay);

            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
