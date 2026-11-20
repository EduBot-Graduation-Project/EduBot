using System;
using EduBot.Api.Shared.Contracts;
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
        logger.LogError(exception, "An unhandled exception occurred");

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

        httpContext.Response.ContentType = "application/json";

        var response = new ApiResponse(
            false,
            "Something went wrong on our side. Please try again later.",
            null
        );

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}
