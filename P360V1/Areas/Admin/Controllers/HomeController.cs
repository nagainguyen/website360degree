using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Main.Areas.Admin.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        [Area ("Admin")]
        public IActionResult Index()
        {
            return View();
        }
        [Area("Admin")]
        public IActionResult Manage_Scenes()
        {
            return View();
        }
        [Area("Admin")]
        public IActionResult Manage_HotSpots()
        {
            return View();
        }

        [Area("Admin")]
        public IActionResult Manage_Locations()
        {
            return View();
        }
        [Area("Admin")]
        public IActionResult Manage_Areas()
        {
            return View();
        }

        [Area("Admin")]
        public IActionResult Manage_Account()
        {
            return View();
        }
    }
}
