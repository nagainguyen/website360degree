using Microsoft.AspNetCore.Mvc;

namespace Main.Controllers
{
    public class LocationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
