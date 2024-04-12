
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;

public class TokenGenerationService : ITokenGenerationService
{

    public TokenGenerationService(IConfiguration configuration)
    {
        var privateKey = configuration["Backend:JWTPrivateRsaKey"];
        var publicKey = configuration["Backend:JWTPublicRsaKey"];

        var keyAlgorithm = RSA.Create();
        keyAlgorithm.ImportFromPem(publicKey);
        keyAlgorithm.ImportFromPem(privateKey);
        keyParameters = keyAlgorithm.ExportParameters(true);
    }

    public RSAParameters keyParameters;

    public string GenerateAccessToken(ApplicationUser applicationUser)
    {
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(
                [
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, applicationUser.Id),
                    new Claim(JwtRegisteredClaimNames.Email, applicationUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
                ]),
            SigningCredentials = new SigningCredentials(new RsaSecurityKey(keyParameters), SecurityAlgorithms.RsaSha256),
            Expires = DateTime.UtcNow.AddMinutes(5),
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}