using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController(IMediator mediator) : ControllerBase
    {
        protected IMediator Mediator { get; } = mediator;
    }
}
