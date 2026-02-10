using System.Net;
using System.Text.Json;
using Application.Common.Exceptions;
using FluentValidation;

namespace API.Middleware;

public class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while processing the request");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var code = HttpStatusCode.InternalServerError;
        var result = string.Empty;

        switch (exception)
        {
            case NotFoundException notFoundException:
                code = HttpStatusCode.NotFound;
                result = JsonSerializer.Serialize(new { error = notFoundException.Message });
                break;
            case UnauthorizedException unauthorizedException:
                code = HttpStatusCode.Unauthorized;
                result = JsonSerializer.Serialize(new { error = unauthorizedException.Message });
                break;
            case UserAlreadyExistsException userExistsException:
                code = HttpStatusCode.Conflict;
                result = JsonSerializer.Serialize(new { error = userExistsException.Message });
                break;
            case ValidationException validationException:
                code = HttpStatusCode.BadRequest;
                result = JsonSerializer.Serialize(new
                {
                    error = "Validation failed",
                    errors = validationException.Errors.Select(e => new
                    {
                        property = e.PropertyName,
                        message = e.ErrorMessage
                    })
                });
                break;
            default:
                result = JsonSerializer.Serialize(new { error = "An error occurred while processing your request" });
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;

        return context.Response.WriteAsync(result);
    }
}