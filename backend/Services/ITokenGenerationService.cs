using Backend.Models;

public interface ITokenGenerationService
{
    public string GenerateAccessToken(ApplicationUser applicationUser);
    /// <summary>
    /// Function to validate whether encrypted token belongs to given user instance.
    /// </summary>
    /// <param name="applicationUser"></param>
    /// <param name="encryptedRefreshToken"></param>
    /// <returns>Returns true if validation token is valid and belongs to user, false otherwise.</returns>
    public Task<bool> ValidateRefreshToken(ApplicationUser applicationUser, string encryptedRefreshToken);
    public Task<TokensDTO> GenerateTokenPairAsync(ApplicationUser applicationUser);
}