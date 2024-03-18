using backend.Migrations;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("issues")]
public class CarIssuesController : ControllerBase
{
    private readonly CarIssueContext carIssueContext;

    public CarIssuesController(CarIssueContext context)
    {
        carIssueContext = context;
    }

    [HttpGet]
    public CarIssue[] GetIssues()
    {
        return carIssueContext.CarIssues.ToArray();
    }

    [HttpGet]
    [Route("/{Id}")]
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