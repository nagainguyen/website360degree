using PROJECT360.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Web360.Controllers
{
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        public IActionResult Logins()
        {

            return View();
        }

        public IActionResult Register()
        {
            return View();
        }
        public IActionResult ForGotPassword()
        {
            return View();
        }
        public IActionResult CheckToken()
        {
            return View();
        }
        public IActionResult ResetPassword()
        {
            return View();
        }
        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
