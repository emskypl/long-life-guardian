using Application.Diets.Commands;
using Application.Diets.DTOs;
using Application.Diets.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

public class DietDaysController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpGet]
    public async Task<ActionResult<List<DietDayDto>>> GetDietDays()
    {
        return await Mediator.Send(new GetDietDaysList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DietDayDto>> GetDietDay(string id)
    {
        return await Mediator.Send(new GetDietDayDetails.Query { Id = id });
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<List<DietDayDto>>> GetDietDayForUser(string id)
    {
        return await Mediator.Send(new GetDietDayForUser.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateDietDay(CreateDietDayDto dietDayDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        return await Mediator.Send(new CreateDietDay.Command
        {
            DietDay = dietDayDto,
            UserId = userId
        });
    }

    [HttpPut]
    public async Task<ActionResult> EditDietDay(DietDayDto dietDayDto)
    {
        await Mediator.Send(new EditDietDay.Command { DietDay = dietDayDto });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDietDay(string id)
    {
        await Mediator.Send(new DeleteDietDay.Command { Id = id });

        return Ok();
    }
}
