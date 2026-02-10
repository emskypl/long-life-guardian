using Application.Diets.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Queries;

public class GetDietDayForUser
{
    public class Query : IRequest<List<DietDayDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<DietDayDto>>
    {
        public async Task<List<DietDayDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.DietDays
                .Where(x => x.UserId == request.Id)
                .Include(x => x.Breakfast!).ThenInclude(m => m.Products)
                .Include(x => x.Lunch!).ThenInclude(m => m.Products)
                .Include(x => x.Dinner!).ThenInclude(m => m.Products)
                .Include(x => x.Snacks!).ThenInclude(m => m.Products)
                .OrderByDescending(d => d.Date)
                .ProjectTo<DietDayDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
