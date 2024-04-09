using Microsoft.AspNetCore.Mvc;

using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[Route("/cars")]
[Authorize]
public class CarController(
    ApplicationDbContext carIssueContext,
    ICarsService carsService) : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext = carIssueContext;
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
}