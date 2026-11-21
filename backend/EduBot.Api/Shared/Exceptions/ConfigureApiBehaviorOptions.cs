using System.Text.Json;
using EduBot.Api.Shared.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace EduBot.Api.Shared.Exceptions;

public class ConfigureApiBehaviorOptions : IConfigureOptions<ApiBehaviorOptions>
{
    public void Configure(ApiBehaviorOptions options)
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context
                .ModelState.Where(ms => ms.Value?.Errors.Count > 0).ToDictionary(
                    kvp => JsonNamingPolicy.CamelCase.ConvertName(kvp.Key),
                    kvp => kvp.Value!.Errors.Select(e =>
                            string.IsNullOrEmpty(e.ErrorMessage)
                                ? e.Exception?.Message ?? "Invalid Data"
                                : e.ErrorMessage)
                        .ToArray()
                );


            var response = new ApiResponse(false, "Validation failed", errors);

            return new BadRequestObjectResult(response);
        };
    }
}