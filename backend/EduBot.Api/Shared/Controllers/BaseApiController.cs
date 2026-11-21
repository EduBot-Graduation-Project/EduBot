using EduBot.Api.Shared.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace EduBot.Api.Shared.Controllers;

[ApiController]
public abstract class BaseApiController : ControllerBase
{
    protected ActionResult<ApiResponse<T>> HandleResult<T>(Result<T> result)
    {
        // If It Successes
        if (result.IsSuccess)
        {
            var apiResponse = new ApiResponse<T>(true, result.Message, result.Data);
            return Ok(apiResponse);
        }

        // Else It Failed
        var errorResponse = new ApiResponse(false, result.Message,
            new Dictionary<string, string[]> { ["general"] = [result.Message ?? ""] });

        switch (result.ErrorType)
        {
            case ResultErrorType.NotFound:
                return NotFound(errorResponse);
            default:
                return BadRequest(errorResponse);
        }
    }

    protected ActionResult<ApiResponse> HandleResult(Result result)
    {
        // If It Successed
        if (result.IsSuccess)
        {
            var apiResponse = new ApiResponse(true, result.Message);
            return Ok(apiResponse);
        }

        // Else It Failed
        var errorResponse = new ApiResponse(false, result.Message,
            new Dictionary<string, string[]> { ["general"] = [result.Message ?? ""] });

        switch (result.ErrorType)
        {
            case ResultErrorType.NotFound:
                return NotFound(errorResponse);
            default:
                return BadRequest(errorResponse);
        }
    }
}