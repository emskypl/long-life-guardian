using System;
using Domain.Diets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetDietDaysList
{
    public class Query : IRequest<List<DietDay>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<DietDay>>
    {
        public async Task<List<DietDay>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.DietDays.Include(d => d.Breakfast).ThenInclude(m => m!.Products)
                .Include(d => d.Lunch).ThenInclude(m => m!.Products)
                .Include(d => d.Dinner).ThenInclude(m => m!.Products)
                .Include(d => d.Snacks).ThenInclude(m => m!.Products)
                .OrderByDescending(d => d.Date)
            .ToListAsync(cancellationToken);
        }
    }
}
