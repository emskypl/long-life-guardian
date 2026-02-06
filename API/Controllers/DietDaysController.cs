using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain.Diets;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DietDaysController : BaseApiController
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

    [HttpPost]
    public async Task<ActionResult<string>> CreateDietDay(DietDay diet)
    {
        return await Mediator.Send(new CreateDietDay.Command { DietDay = diet });
    }

    [HttpPut]
    public async Task<ActionResult> EditDietDay(DietDay diet)
    {
        await Mediator.Send(new EditDietDay.Command { DietDay = diet });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDiet(string id)
    {
        await Mediator.Send(new DeleteDietDay.Command { Id = id });

        return Ok();
    }
}
