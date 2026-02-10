using Application.Common.Exceptions;
using Application.Diets.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Diets.Queries;

public class GetDietDayDetails
{
    public class Query : IRequest<DietDayDto>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, DietDayDto>
    {
        public async Task<DietDayDto> Handle(Query request, CancellationToken cancellationToken)
        {
            var dietDay = await context.DietDays
                .Include(d => d.Breakfast).ThenInclude(m => m!.Products)
                .Include(d => d.Lunch).ThenInclude(m => m!.Products)
                .Include(d => d.Dinner).ThenInclude(m => m!.Products)
                .Include(d => d.Snacks).ThenInclude(m => m!.Products)
                .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

            if (dietDay == null)
            {
                throw new NotFoundException("DietDay", request.Id);
            }

            return mapper.Map<DietDayDto>(dietDay);
        }
    }
}
