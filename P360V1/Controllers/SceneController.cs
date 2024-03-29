using Microsoft.AspNetCore.Mvc;

namespace Main.Controllers
{
    public class SceneController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
