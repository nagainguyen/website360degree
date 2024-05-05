using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Main.Areas.User.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        [Area ("User")]
        [Authorize(Roles = "User")]
        public IActionResult Index()
        {
            return View();
        }
        [Area("User")]
        [Authorize(Roles = "User")]
        public IActionResult Manage_Scenes()
        {
            return View();
        }
        [Area("User")]
        [Authorize(Roles = "User")]
        public IActionResult Manage_HotSpots()
        {
            return View();
        }

        [Area("User")]
        [Authorize(Roles = "User")]
        public IActionResult Manage_Locations()
        {
            return View();
        }
        [Area("User")]
        [Authorize(Roles = "User")]
        public IActionResult Manage_Areas()
        {
            return View();
        }

        [Area("User")]
        [Authorize(Roles = "User")]
        public IActionResult Manage_Account()
        {
            return View();
        }
    }
}
