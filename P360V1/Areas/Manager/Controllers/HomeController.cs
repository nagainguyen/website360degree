using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Main.Areas.Manager.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        [Area ("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Index()
        {
            return View();
        }
        [Area("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Manage_Scenes()
        {
            return View();
        }
        [Area("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Manage_HotSpots()
        {
            return View();
        }

        [Area("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Manage_Locations()
        {
            return View();
        }
        [Area("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Manage_Areas()
        {
            return View();
        }

        [Area("Manager")]
        [Authorize(Roles = "Manager")]
        public IActionResult Manage_Account()
        {
            return View();
        }
    }
}
