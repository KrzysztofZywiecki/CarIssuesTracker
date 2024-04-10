
namespace Backend.Exceptions;

public class ResourceNotFoundException : Exception
{
    public ResourceNotFoundException() : base("Requested resource was not found") { }
}