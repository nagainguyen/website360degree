using Microsoft.AspNetCore.Mvc;

namespace Main.Controllers
{
    public class HotSpotController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
