using Microsoft.AspNetCore.Mvc;
using PROJECT360.Models;
using System.Diagnostics;

namespace PROJECT360.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ViewAbout()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult Options_Scenes()
        {
            return View();
        }
        public IActionResult Options_HotSpots()
        {
            return View();
        }
        
        public IActionResult Options_AllManage()
        {
            return View();
        }
        public IActionResult Error(int? statusCode = null)
        {
            if (statusCode.HasValue)
            {
                if (statusCode.Value == 404)
                {
                    return View("Error");
                }
              
            }

            return View("Error"); 
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
