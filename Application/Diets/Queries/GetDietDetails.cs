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
                .Include(d => d.Breakfast).ThenInclude(m => m!.Products)
                .Include(d => d.Lunch).ThenInclude(m => m!.Products)
                .Include(d => d.Dinner).ThenInclude(m => m!.Products)
                .Include(d => d.Snacks).ThenInclude(m => m!.Products)
                .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
            
            if (dietDay == null)
            {
                throw new NotFoundException(nameof(DietDay), request.Id);
            }
            
            return dietDay;
        }
    }


}
