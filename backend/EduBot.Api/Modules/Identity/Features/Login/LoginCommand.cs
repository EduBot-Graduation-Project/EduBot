using MediatR;

namespace EduBot.Api.Modules.Identity.Features.Login;

public record LoginCommand(string Email, string Password) : IRequest<LoginResponseDto>;

public record LoginResponseDto(string Token);
