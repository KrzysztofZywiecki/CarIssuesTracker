
namespace Backend.Exceptions;

public class UnauthorizedException : Exception
{
    public UnauthorizedException() : base("User is unauthorized") { }
}