using System.Text.Json;
using EduBot.Api.Shared.Contracts;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;

namespace EduBot.Api.Shared.Exceptions;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        if (exception is ValidationException validationException)
        {
            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            httpContext.Response.ContentType = "application/json";

            var validationErrors =
                validationException.Errors.GroupBy(e => e.PropertyName)
                    .ToDictionary(group => JsonNamingPolicy.CamelCase.ConvertName(group.Key),
                        group => group.Select(e => e.ErrorMessage).ToArray()
                    );

            var errorResult = new ApiResponse(false, "Validation failed", validationErrors);

            await httpContext.Response.WriteAsJsonAsync(errorResult, cancellationToken);

            return true;
        }

        logger.LogError(exception, "An unhandled exception occurred");

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

        httpContext.Response.ContentType = "application/json";

        var response = new ApiResponse(
            false,
            "Something went wrong on our side. Please try again later."
        );

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}