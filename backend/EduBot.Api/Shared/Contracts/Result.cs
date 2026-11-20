namespace EduBot.Api.Shared.Contracts;

public enum ResultErrorType
{
    NotFound,
    BadRequest,
}

public record Result<T>(
    bool IsSuccess,
    string Message,
    ResultErrorType? ErrorType,
    T? Data = default
)
{
    public static Result<T> Success(T data, string message = "") => new(true, message, null, data);

    public static Result<T> NotFound(string message = "") =>
        new(false, message, ResultErrorType.NotFound);

    public static Result<T> Failure(string message = "") =>
        new(false, message, ResultErrorType.BadRequest);
}

public record Result(bool IsSuccess, string Message, ResultErrorType? ErrorType = null)
{
    public static Result Success(string message = "") => new(true, message, null);

    public static Result NotFound(string message = "") =>
        new(false, message, ResultErrorType.NotFound);

    public static Result Failure(string message = "") =>
        new(false, message, ResultErrorType.BadRequest);
}
