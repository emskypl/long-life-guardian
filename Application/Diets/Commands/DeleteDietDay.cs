using Application.Common.Exceptions;
using MediatR;
using Persistence;

namespace Application.Diets.Commands;

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
            var dietDay = await context.DietDays.FindAsync([request.Id], cancellationToken);

            if (dietDay == null)
            {
                throw new NotFoundException("DietDay", request.Id);
            }

            context.Remove(dietDay);

            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
