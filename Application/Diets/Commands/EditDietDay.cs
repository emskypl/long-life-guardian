using Application.Common.Exceptions;
using AutoMapper;
using Domain.Diets;
using MediatR;
using Persistence;
using System;

namespace Application.Diets.Commands;

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
            var dietDay = await context.DietDays.FindAsync([request.DietDay.Id], cancellationToken);


            if (dietDay == null)
            {
                throw new NotFoundException("DietDay", request.DietDay.Id);
            }

            mapper.Map(request.DietDay, dietDay);

            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
