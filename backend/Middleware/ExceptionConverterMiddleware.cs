
using Backend.Exceptions;

namespace Backend.Middleware;

public class ExceptionConverterMiddleware(ILogger<ExceptionConverterMiddleware> logger) : IMiddleware
{
    private ILogger<ExceptionConverterMiddleware> logger = logger;
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ResourceNotFoundException e)
        {
            context.Response.StatusCode = 404;
            context.Response.ContentType = "text";
            await context.Response.WriteAsync(e.Message);
        }
        catch (UnauthorizedException e)
        {
            context.Response.StatusCode = 400;
            context.Response.ContentType = "text";
            await context.Response.WriteAsync(e.Message);
        }
        catch (Exception e)
        {
            logger.Log(LogLevel.Warning, e.Message);
            context.Response.StatusCode = 500;
            context.Response.ContentType = "text";
            await context.Response.WriteAsync("An exception has occured while processing the request");
        }
    }
}