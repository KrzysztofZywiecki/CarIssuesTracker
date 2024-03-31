using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("issues")]
public class CarIssuesController : ControllerBase
{
    private readonly ApplicationDbContext carIssueContext;

    public CarIssuesController(ApplicationDbContext context)
    {
        carIssueContext = context;
    }

    [HttpGet]
    public CarIssue[] GetIssues()
    {
        return carIssueContext.CarIssues.ToArray();
    }

    [HttpGet]
    [Route("{Id}")]
    public ActionResult<CarIssue> GetIssuesForUser(long Id)
    {
        var found = carIssueContext.CarIssues.Find(Id);
        if (found != null)
        {
            return found;
        }
        else
        {
            return NotFound();
        }
    }
}