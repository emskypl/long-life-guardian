using System;
using AutoMapper;
using Domain.Diets;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditDietDay
{
    public class Command : IRequest
    {
        public required DietDay DietDay { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var dietDay = await context.DietDays.FindAsync([request.DietDay.Id], cancellationToken) ?? throw new Exception("Cannot find diet day");

            mapper.Map(request.DietDay, dietDay);

            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
