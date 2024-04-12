using Backend.Models;

public interface ITokenGenerationService
{
    public string GenerateAccessToken(ApplicationUser applicationUser);
}