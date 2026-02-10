using Application.Common.Exceptions;
using Application.Diets.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Commands;

public class EditDietDay
{
    public class Command : IRequest
    {
        public required DietDayDto DietDay { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var dietDay = await context.DietDays
                .Include(d => d.Breakfast).ThenInclude(m => m!.Products)
                .Include(d => d.Lunch).ThenInclude(m => m!.Products)
                .Include(d => d.Dinner).ThenInclude(m => m!.Products)
                .Include(d => d.Snacks).ThenInclude(m => m!.Products)
                .FirstOrDefaultAsync(d => d.Id == request.DietDay.Id, cancellationToken);

            if (dietDay == null)
            {
                throw new NotFoundException("DietDay", request.DietDay.Id);
            }

            mapper.Map(request.DietDay, dietDay);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
