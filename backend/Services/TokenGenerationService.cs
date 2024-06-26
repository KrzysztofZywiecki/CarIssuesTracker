
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;

public class TokenGenerationService : ITokenGenerationService
{

    public TokenGenerationService(IConfiguration configuration, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        var secret = configuration["Backend:JWTSecret"];
        Debug.Assert(secret is not null);
        tokenSecret = Encoding.ASCII.GetBytes(secret);
        this.userManager = userManager;
    }

    private byte[] tokenSecret;
    private UserManager<ApplicationUser> userManager;

    public async Task<TokensDTO> GenerateTokenPairAsync(ApplicationUser applicationUser)
    {
        var accessToken = GenerateAccessToken(applicationUser);
        var refreshToken = GenerateRefreshToken();

        var refreshExpiery = DateTime.UtcNow.AddHours(1);
        applicationUser.RefreshTokens.Add(new RefreshTokenData(refreshToken, refreshExpiery));
        await userManager.UpdateAsync(applicationUser);
        return new TokensDTO(applicationUser.Id, accessToken, refreshToken);
    }

    public async Task<bool> ValidateRefreshToken(ApplicationUser applicationUser, string refreshToken)
    {
        var retrievedToken = applicationUser.RefreshTokens.FirstOrDefault(x => x.Token == refreshToken);
        if (retrievedToken is not null)
        {
            var now = DateTime.UtcNow;
            var expired = retrievedToken.ExpirationDate < now;

            applicationUser.RefreshTokens.Remove(retrievedToken);
            await userManager.UpdateAsync(applicationUser);

            return !expired;
        }
        return false;
    }

    public string GenerateAccessToken(ApplicationUser applicationUser)
    {
        IEnumerable<Claim> claims = [
                new Claim(JwtRegisteredClaimNames.Sub, applicationUser.Id),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString()),
            ];
        if (applicationUser.UserName is not null)
        {
            claims.Append(new Claim(ClaimTypes.Name, applicationUser.UserName));
        }
        if (applicationUser.Email is not null)
        {
            claims.Append(new Claim(ClaimTypes.Name, applicationUser.Email));
        }

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(
                claims
            ),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenSecret), SecurityAlgorithms.HmacSha256),
            Expires = DateTime.UtcNow.AddMinutes(15),

        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var token = GetRandomString();
        return token;
    }

    private string GetRandomString()
    {
        var vector = new byte[128];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(vector);
            return Convert.ToBase64String(vector);
        }
    }
}