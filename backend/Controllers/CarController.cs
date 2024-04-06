using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers;

[Route("/car")]
[Authorize]
public class CarController(
    ApplicationDbContext carIssueContext,
    UserManager<ApplicationUser> userManager,
    IAuthorizationService authorizationService,
    ICarsService carsService) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;
    private readonly UserManager<ApplicationUser> userManager = userManager;
    private readonly IAuthorizationService authorizationService = authorizationService;
    private readonly ICarsService carsService = carsService;

    [HttpPost]
    public async Task<ActionResult> AddCar([FromBody] CreateCarDTO createCarDTO)
    {
        await carsService.CreateCar(User, createCarDTO);
        return Created();
    }

    [Route("{Id}")]
    [HttpGet]
    public async Task<ActionResult<CarDTO>> GetCar([FromRoute] Guid Id)
    {
        return Ok(await carsService.GetCar(User, Id));
    }

    [Route("{Id}")]
    [HttpDelete]
    public async Task<ActionResult> DeleteCar([FromRoute] Guid Id)
    {
        await carsService.DeleteCar(User, Id);
        return NoContent();
    }

    [Route("getAll")]
    [HttpGet]
    public async Task<ActionResult<CarDTO[]>> GetUserCars()
    {
        return Ok(await carsService.GetUserCars(User));
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
        return NotFound();
    }
}