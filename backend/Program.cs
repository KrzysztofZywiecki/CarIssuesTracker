
using System.Text.Json.Serialization;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddScoped<ICarsService, CarsService>();
builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlite("Data Source=carIssuesDatabase.db"));
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SameOwnerPolicy", policy =>
    {
        policy.Requirements.Add(new SameAuthorRequirement());
    });
});
builder.Services.AddSingleton<IAuthorizationHandler, CarOwnershipAuthorizationHandler>();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>(opt =>
{
    opt.Password = new PasswordOptions
    {
        RequireDigit = false,
        RequiredUniqueChars = 0,
        RequireNonAlphanumeric = false,
        RequireUppercase = false,
        RequireLowercase = false,
    };
}).AddEntityFrameworkStores<ApplicationDbContext>();

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
app.MapIdentityApi<ApplicationUser>();
app.MapControllers();
app.UseAuthorization();
app.Run();

