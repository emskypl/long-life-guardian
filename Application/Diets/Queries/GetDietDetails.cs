using System;
using Application.Common.Exceptions;
using Domain.Diets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Queries;

public class GetDietDayDetails
{
    public class Query : IRequest<DietDay>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, DietDay>
    {
        public async Task<DietDay> Handle(Query request, CancellationToken cancellationToken)
        {
            var dietDay = await context.DietDays
                .Include(d => d.Breakfast)
                .Include(d => d.Lunch)
                .Include(d => d.Dinner)
                .Include(d => d.Snacks)
                .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
            
            if (dietDay == null)
            {
                throw new NotFoundException(nameof(DietDay), request.Id);
            }

            // Load products for each non-null meal
            if (dietDay.Breakfast != null)
            {
                await context.Entry(dietDay.Breakfast).Collection(m => m.Products).LoadAsync(cancellationToken);
            }
            if (dietDay.Lunch != null)
            {
                await context.Entry(dietDay.Lunch).Collection(m => m.Products).LoadAsync(cancellationToken);
            }
            if (dietDay.Dinner != null)
            {
                await context.Entry(dietDay.Dinner).Collection(m => m.Products).LoadAsync(cancellationToken);
            }
            if (dietDay.Snacks != null)
            {
                await context.Entry(dietDay.Snacks).Collection(m => m.Products).LoadAsync(cancellationToken);
            }
            
            return dietDay;
        }
    }


}
