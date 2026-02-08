using Application.Core;
using Application.Login.Commands;
using Application.Login.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LoginController : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] Register.Command command)
    {
        try
        {
            return await Mediator.Send(command);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] Application.Login.Queries.Login.Query query)
    {
        try
        {
            return await Mediator.Send(query);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
