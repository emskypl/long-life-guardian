using System;
using Domain.Diets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Queries;

public class GetDietDaysList
{
    public class Query : IRequest<List<DietDay>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<DietDay>>
    {
        public async Task<List<DietDay>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dietDays = await context.DietDays
                .Include(d => d.Breakfast)
                .Include(d => d.Lunch)
                .Include(d => d.Dinner)
                .Include(d => d.Snacks)
                .ToListAsync(cancellationToken);

            // Load products for each non-null meal
            foreach (var dietDay in dietDays)
            {
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
            }

            return dietDays;
        }
    }
}
