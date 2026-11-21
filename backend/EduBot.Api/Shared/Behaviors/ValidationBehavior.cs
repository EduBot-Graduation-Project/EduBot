using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace EduBot.Api.Shared.Behaviors;

public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        if (!validators.Any())
        {
            return await next();
        }

        List<ValidationFailure> validationFailures = [];

        foreach (var validator in validators)
        {
            var validatorErrors = await validator.ValidateAsync(request, cancellationToken);
            validationFailures.AddRange(validatorErrors.Errors);
        }

        if (validationFailures.Count > 0)
        {
            throw new ValidationException(validationFailures);
        }

        return await next();
    }
}
