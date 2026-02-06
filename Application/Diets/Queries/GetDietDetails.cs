using System;
using Domain.Diets;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

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
            return dietDay ?? throw new Exception("Activity not found");
        }
    }


}
