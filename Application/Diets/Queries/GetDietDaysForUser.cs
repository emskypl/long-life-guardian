using System;
using Domain.Diets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetDietDayForUser
{
    public class Query : IRequest<List<DietDay>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<DietDay>>
    {
        public async Task<List<DietDay>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dietDays = await context.DietDays.Where(x => x.UserId == request.Id)
                                                .Include(x => x.Breakfast!).ThenInclude(m => m.Products)
                                                .Include(x => x.Lunch!).ThenInclude(m => m.Products)
                                                .Include(x => x.Dinner!).ThenInclude(m => m.Products)
                                                .Include(x => x.Snacks!).ThenInclude(m => m.Products)
                                                .ToListAsync(cancellationToken);
            return dietDays ?? throw new Exception("Diet days for user not found");
        }
    }


}
