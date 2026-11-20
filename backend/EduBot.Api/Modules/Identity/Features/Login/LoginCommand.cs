using EduBot.Api.Shared.Contracts;
using MediatR;

namespace EduBot.Api.Modules.Identity.Features.Login;

public record LoginCommand(string Email, string Password) : IRequest<Result<LoginResponseDto>>;

public record LoginResponseDto(string Token);
