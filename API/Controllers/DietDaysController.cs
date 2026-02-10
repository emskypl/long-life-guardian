using Application.Diets.Commands;
using Application.Diets.Queries;
using Domain.Diets;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DietDaysController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpGet]
    public async Task<ActionResult<List<DietDay>>> GetDietDays()
    {
        return await Mediator.Send(new GetDietDaysList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DietDay>> GetDietDay(string id)
    {
        return await Mediator.Send(new GetDietDayDetails.Query { Id = id });
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<List<DietDay>>> GetDietDayForUser(string id)
    {
        return await Mediator.Send(new GetDietDayForUser.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateDietDay(DietDay dietDay)
    {
        return await Mediator.Send(new CreateDietDay.Command { DietDay = dietDay });
    }

    [HttpPut]
    public async Task<ActionResult> EditDietDay(DietDay dietDay)
    {
        await Mediator.Send(new EditDietDay.Command { DietDay = dietDay });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDietDay(string id)
    {
        await Mediator.Send(new DeleteDietDay.Command { Id = id });

        return Ok();
    }
}
