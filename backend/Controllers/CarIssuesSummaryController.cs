
using System.Security.Claims;
using Backend.DTOs;
using System;
using Backend.Exceptions;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("summary")]
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
    [Route("{CarId}")]
    public async Task<ActionResult<CarSummaryDTO>> GetSummaryForCar([FromRoute] Guid CarId)
    {
        var car = await GetCarAsync(User, CarId);
        var entries = car.Issues.Where(x => x.RepairDateTime is not null).GroupBy(x => x.RepairDateTime!.Value.ToString("yyyy-MM"))
            .Select(x => new SummaryEntryDTO(x.Sum(y => (float)(y.RepairCost ?? 0)), x.Key));
        return Ok(new CarSummaryDTO(CarId, entries));
    }
}