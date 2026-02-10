using Application.Common.Exceptions;
using Domain.Diets;
using MediatR;
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
            var dietDay = await context.DietDays.FindAsync([request.Id], cancellationToken);


            if (dietDay == null)
            {
                throw new NotFoundException("DietDay", request.Id);
            }

            return dietDay ?? throw new Exception("Diet day not found");
        }
    }
}
