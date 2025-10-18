using System;
using Domain;
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
            return await context.DietDays.ToListAsync(cancellationToken);
        }
    }
}
