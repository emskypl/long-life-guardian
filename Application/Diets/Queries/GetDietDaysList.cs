using Application.Diets.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Queries;

public class GetDietDaysList
{
    public class Query : IRequest<List<DietDayDto>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<DietDayDto>>
    {
        public async Task<List<DietDayDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.DietDays
                .Include(d => d.Breakfast).ThenInclude(m => m!.Products)
                .Include(d => d.Lunch).ThenInclude(m => m!.Products)
                .Include(d => d.Dinner).ThenInclude(m => m!.Products)
                .Include(d => d.Snacks).ThenInclude(m => m!.Products)
                .OrderByDescending(d => d.Date)
                .ProjectTo<DietDayDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
