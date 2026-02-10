using Application.Core;
using Application.Login.Commands;
using Application.Login.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LoginController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] Register.Command command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] Login.Query query)
    {
        return await Mediator.Send(query);
    }
}
