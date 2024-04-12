
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using Backend.Middleware;
using Backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddScoped<ICarsService, CarsService>();
builder.Services.AddScoped<ICarIssuesService, CarIssuesService>();
builder.Services.AddTransient<ExceptionConverterMiddleware>();
builder.Services.AddSingleton<IAuthorizationHandler, CarOwnershipAuthorizationHandler>();
builder.Services.AddSingleton<ITokenGenerationService, TokenGenerationService>();
builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlite("Data Source=carIssuesDatabase.db"));

var publicKey = builder.Configuration["Backend:JWTPublicRsaKey"];
var privateKey = builder.Configuration["Backend:JWTPrivateRsaKey"];

var rsaKey = RSA.Create();
rsaKey.ImportFromPem(publicKey.ToCharArray());
rsaKey.ImportFromPem(privateKey.ToCharArray());
var keyParameters = rsaKey.ExportParameters(true);

builder.Services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;

        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new RsaSecurityKey(keyParameters),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SameOwnerPolicy", policy =>
    {
        policy.Requirements.Add(new SameAuthorRequirement());
    });
});
builder.Services.AddIdentityCore<ApplicationUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionConverterMiddleware>();
app.MapControllers();
app.MapPost("login", async ([FromBody] LoginRequest loginRequest, [FromServices] UserManager<ApplicationUser> userManager) =>
{
    var user = await userManager.FindByEmailAsync(loginRequest.Email);
    if (user is not null)
    {
        var correctPassword = await userManager.CheckPasswordAsync(user, loginRequest.Password);
        if (correctPassword)
        {
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("Id", Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString())
                    }),
                SigningCredentials = new SigningCredentials(new RsaSecurityKey(rsaKey.ExportParameters(true)), SecurityAlgorithms.RsaSha256),
                Expires = DateTime.UtcNow.AddMinutes(5),
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var stringToken = tokenHandler.WriteToken(token);
            return Results.Ok(stringToken);
        }
    }
    return Results.Unauthorized();
}
);
app.Run();

