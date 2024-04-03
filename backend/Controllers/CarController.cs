using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers;

[Route("/car")]
[Authorize]
public class CarController(ApplicationDbContext carIssueContext, UserManager<ApplicationUser> userManager, IAuthorizationService authorizationService) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;
    private readonly UserManager<ApplicationUser> userManager = userManager;
    private readonly IAuthorizationService _authorizationService = authorizationService;

    [HttpPost]
    public async Task<ActionResult<CarDTO>> AddCar([FromBody] CreateCarDTO createCarDTO)
    {
        var userId = userManager.GetUserId(User);
        if (userId is null)
        {
            return Unauthorized();
        }

        var user = await carIssueContext.Users.Include(x => x.Cars).FirstOrDefaultAsync(x => x.Id == userId);

        if (user != null)
        {
            var car = new Car { Name = createCarDTO.Name };
            user.Cars.Add(car);
            await carIssueContext.SaveChangesAsync();
            return Ok(new CarDTO(car));
        }
        else
        {
            return NotFound();
        }
    }

    [Route("{Id}")]
    [HttpGet]
    public async Task<ActionResult<CarDTO>> GetCar([FromRoute] Guid Id)
    {
        var car = await carIssueContext.Cars.FindAsync(Id);
        if (car != null)
        {
            var authorizationResult = await _authorizationService.AuthorizeAsync(User, car, "SameOwnerPolicy");
            if (authorizationResult.Succeeded)
            {
                return new CarDTO(car);
            }
            else
            {
                return Unauthorized();
            }
        }
        else
        {
            return NotFound();
        }
    }

    [Route("getAll")]
    [HttpGet]
    public async Task<ActionResult<CarDTO[]>> GetUserCars()
    {
        var userId = userManager.GetUserId(User);
        var result = carIssueContext.Cars.Where(x => x.ApplicationUserId == userId).Select(x => new CarDTO(x));
        return await result.ToArrayAsync();
    }

    [Route("{Id}/issues")]
    [HttpGet]
    public async Task<ActionResult<CarIssueDTO[]>> GetCarIssues([FromRoute] Guid Id)
    {
        var car = await carIssueContext.Cars.Include(x => x.Issues).FirstAsync(x => x.Id == Id);
        if (car != null)
        {
            var result = car.Issues.Select(x => new CarIssueDTO(x)).ToArray();
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }
}