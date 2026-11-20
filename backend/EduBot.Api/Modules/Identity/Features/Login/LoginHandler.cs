using System.Security.Claims;
using EduBot.Api.Modules.Identity.Entities;
using EduBot.Api.Modules.Identity.Services;
using EduBot.Api.Shared.Contracts;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EduBot.Api.Modules.Identity.Features.Login;

public class LoginHandler(UserManager<ApplicationUser> userManager, TokenService tokenService)
    : IRequestHandler<LoginCommand, Result<LoginResponseDto>>
{
    public async Task<Result<LoginResponseDto>> Handle(
        LoginCommand request,
        CancellationToken cancellationToken
    )
    {
        // Check If User Exist
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Result<LoginResponseDto>.Failure("Invalid Email Or Password");
        }

        // Check Password
        var IsPasswordCorrect = await userManager.CheckPasswordAsync(user, request.Password);
        if (!IsPasswordCorrect)
        {
            return Result<LoginResponseDto>.Failure("Invalid Email Or Password");
        }

        // Get User Roles
        var roles = await userManager.GetRolesAsync(user);

        // Create All Token Claims
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
        };

        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        // Generate Token
        var userToken = tokenService.JwtTokenGenerator(claims);

        return Result<LoginResponseDto>.Success(
            new LoginResponseDto(userToken),
            "Signed in successfully."
        );
    }
}
