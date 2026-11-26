using EduBot.Api.Shared.Enums;

namespace EduBot.Api.Shared.Contracts;

public record Result<T>(
    bool IsSuccess,
    string Message,
    ResultErrorTypeEnum? ErrorType,
    T? Data = default
)
{
    public static Result<T> Success(T data, string message = "") => new(true, message, null, data);

    public static Result<T> NotFound(string message = "") =>
        new(false, message, ResultErrorTypeEnum.NotFound);

    public static Result<T> Failure(string message = "") =>
        new(false, message, ResultErrorTypeEnum.BadRequest);
}

public record Result(bool IsSuccess, string Message, ResultErrorTypeEnum? ErrorType = null)
{
    public static Result Success(string message = "") => new(true, message, null);

    public static Result NotFound(string message = "") =>
        new(false, message, ResultErrorTypeEnum.NotFound);

    public static Result Failure(string message = "") =>
        new(false, message, ResultErrorTypeEnum.BadRequest);
}
