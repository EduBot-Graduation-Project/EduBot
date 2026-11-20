using EduBot.Api.Modules.Identity.Features.Login;
using EduBot.Api.Shared.Contracts;
using EduBot.Api.Shared.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EduBot.Api.Modules.Identity.Controllers;

[Route("api/auth")]
public class AuthController(ISender sender) : BaseApiController
{
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login(
        LoginCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await sender.Send(command, cancellationToken);

        return HandleResult(result);
    }
}
