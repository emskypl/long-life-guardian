using Application.Diets.DTOs;
using AutoMapper;
using Domain.Diets;
using MediatR;
using Persistence;

namespace Application.Diets.Commands;

public class CreateDietDay
{
    public class Command : IRequest<string>
    {
        public required CreateDietDayDto DietDay { get; set; }
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var dietDay = mapper.Map<DietDay>(request.DietDay);
            dietDay.UserId = request.UserId;

            context.DietDays.Add(dietDay);
            await context.SaveChangesAsync(cancellationToken);
            
            return dietDay.Id;
        }
    }
}
