using System.Security.Claims;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class CarIssuesService(
    ApplicationDbContext applicationDbContext,
    IAuthorizationService authorizationService,
    UserManager<ApplicationUser> userManager) : ICarIssuesService
{

    private readonly ApplicationDbContext applicationDbContext = applicationDbContext;
    private readonly IAuthorizationService authorizationService = authorizationService;
    private readonly UserManager<ApplicationUser> userManager = userManager;

    private async Task<Car> GetCarAsync(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await applicationDbContext.Cars
            .Include(x => x.Issues)
            .Include(x => x.ApplicationUser)
            .FirstAsync(x => x.Id == carId);
        var authorizationResult = await authorizationService.AuthorizeAsync(userPrincipal, car, "SameOwnerPolicy");
        if (authorizationResult.Succeeded)
        {
            return car;
        }
        throw new Exception("User is unauthorized");
    }
    public async Task<CarIssueDTO> CreateCarIssue(ClaimsPrincipal userPrincipal, Guid carId, CreateCarIssueDTO createCarIssueDTO)
    {
        var carIssue = new CarIssue()
        {
            Title = createCarIssueDTO.Title,
            Description = createCarIssueDTO.Description,
            CreateDateTime = createCarIssueDTO.CreateDateTime
        };
        var car = await GetCarAsync(userPrincipal, carId);
        car.Issues.Add(carIssue);
        await applicationDbContext.SaveChangesAsync();
        return new CarIssueDTO(carIssue);
    }

    public async Task<CarIssueDTO[]> GetCarIssues(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        var carIssues = car.Issues.Select(x => new CarIssueDTO(x)).ToArray();
        return carIssues;
    }

    public async Task RemoveCarIssue(ClaimsPrincipal userPrincipal, Guid carId, Guid carIssueId)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        var issue = car.Issues.First(x => x.Id == carIssueId);
        applicationDbContext.CarIssues.Remove(issue);
    }

    public async Task<CarIssueDTO> UpdateCarIssue(ClaimsPrincipal userPrincipal, Guid carId, Guid carIssueId, UpdateCarIssueDTO carIssueDTO)
    {
        var car = await GetCarAsync(userPrincipal, carId);
        var issue = car.Issues.First(x => x.Id == carIssueId);
        issue.Title = carIssueDTO.Title;
        issue.Description = carIssueDTO.Description;
        issue.CreateDateTime = carIssueDTO.CreateDateTime;
        issue.RepairDateTime = carIssueDTO.RepairDateTime;
        issue.RepairCost = carIssueDTO.RepairCost;
        await applicationDbContext.SaveChangesAsync();
        return new CarIssueDTO(issue);
    }
}