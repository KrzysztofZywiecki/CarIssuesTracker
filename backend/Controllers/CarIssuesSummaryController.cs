
using System.Security.Claims;
using Backend.DTOs;
using System;
using Backend.Exceptions;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("summary/{CarId}")]
[Authorize]
public class CarIssuesSummaryController(ApplicationDbContext applicationDbContext, IAuthorizationService authorizationService) : ControllerBase
{
    private readonly ApplicationDbContext applicationDbContext = applicationDbContext;
    IAuthorizationService authorizationService = authorizationService;

    private async Task<Car> GetCarAsync(ClaimsPrincipal userPrincipal, Guid carId)
    {
        var car = await applicationDbContext.Cars.Include(x => x.ApplicationUser).Include(x => x.Issues).FirstOrDefaultAsync(x => x.Id == carId);
        if (car != null)
        {
            var authorizationResult = await authorizationService.AuthorizeAsync(userPrincipal, car, "SameOwnerPolicy");
            if (authorizationResult.Succeeded)
            {
                return car;
            }
            else
            {
                throw new UnauthorizedException();
            }
        }
        else
        {
            throw new ResourceNotFoundException();
        }
    }

    [HttpGet]
    [Route("monthlySpending")]
    public async Task<ActionResult<CarSummaryDTO>> GetMonthlySpendingForCar([FromRoute] Guid CarId)
    {
        var car = await GetCarAsync(User, CarId);
        var entries = car.Issues.Where(x => x.Resolved).GroupBy(x => x.RepairDateTime!.Value.ToString("yyyy-MM"))
            .Select(x => new SummaryEntryDTO(x.Sum(y => (float)(y.RepairCost ?? 0)), x.Key));
        return Ok(new CarSummaryDTO(CarId, entries));
    }

    [HttpGet]
    [Route("totalSpending")]
    public async Task<ActionResult<decimal>> GetTotalSpendingForCar([FromRoute] Guid CarId)
    {
        var car = await GetCarAsync(User, CarId);
        var spending = car.Issues.Where(x => x.Resolved).Sum(x => x.RepairCost);
        return Ok(spending);
    }
}