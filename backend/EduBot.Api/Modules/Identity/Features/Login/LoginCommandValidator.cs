using FluentValidation;

namespace EduBot.Api.Modules.Identity.Features.Login;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(prop => prop.Email).NotEmpty().EmailAddress();
        RuleFor(prop => prop.Password).NotEmpty();
    }
}