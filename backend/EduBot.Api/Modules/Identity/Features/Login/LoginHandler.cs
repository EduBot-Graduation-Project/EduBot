using EduBot.Api.Modules.Identity.Entities;
using EduBot.Api.Modules.Identity.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EduBot.Api.Modules.Identity.Features.Login;

public class LoginHandler(UserManager<ApplicationUser> userManager, TokenService tokenService)
    : IRequestHandler<LoginCommand, LoginResponseDto>
{
    public async Task<LoginResponseDto> Handle(
        LoginCommand request,
        CancellationToken cancellationToken
    )
    {
        throw new NotImplementedException();
    }
}
