using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController(IMediator mediator) : ControllerBase
    {
        protected IMediator Mediator { get; } = mediator;
    }
}
