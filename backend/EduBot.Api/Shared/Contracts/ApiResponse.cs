namespace EduBot.Api.Shared.Contracts;

public record ApiResponse<T>(
    bool IsSuccess,
    string Message = "",
    T? Data = default,
    List<string>? Errors = null
);

public record ApiResponse(bool IsSuccess, string Message = "", List<string>? Errors = null)
    : ApiResponse<object>(IsSuccess, Message, null, Errors);
