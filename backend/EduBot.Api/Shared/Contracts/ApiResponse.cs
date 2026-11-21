namespace EduBot.Api.Shared.Contracts;

public record ApiResponse<T>(
    bool IsSuccess,
    string Message = "",
    T? Data = default,
    Dictionary<string, string[]>? Errors = null
);

public record ApiResponse(
    bool IsSuccess,
    string Message = "",
    Dictionary<string, string[]>? Errors = null
) : ApiResponse<object>(IsSuccess, Message, null, Errors);
