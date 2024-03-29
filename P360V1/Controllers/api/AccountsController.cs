using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private LoginsService loginsService;

        public AccountsController(LoginsService loginsService)
        {
            this.loginsService = loginsService;
        }

        [HttpPost]
        [Route("InsertAccount")]
        public IActionResult insertAccount(LoginsModel loginsModel)
        {
            Logins logins = new Logins();

            logins.NameAccount = loginsModel.NameAccount;
            logins.Password = loginsModel.Password;


            loginsService.insertLogins(logins);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }

        [HttpPost]
        [Route("LoginsAccount")]
        public IActionResult loginAccount(LoginsModel loginsModel)
        {
            Logins logins = loginsService.GetAccount(loginsModel.NameAccount);
            if (logins != null && logins.Password.Equals(loginsModel.Password))
            {
                return Ok(new { status = true, message =   "" });
            }
            else
            {
                return RedirectToAction("Logins");
            }
        }

        [HttpGet]
        [Route("ListAccount")]
        public IActionResult GetListAccount()
        {

            List<Logins> listAccount = loginsService.GetListAccounts();
            return Ok(new { status = true, message = "SUCCESS", data = listAccount });
        }

        [HttpPost]
        [Route("DeleteAccount")]
        public IActionResult deleteAccount(LoginsModel loginsModel)
        {
            loginsService.deleteLogins(loginsModel.NameAccount);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }

        [HttpPost]
        [Route("UpdateAccount")]
        public IActionResult updateAccount(LoginsModel loginsModel)
        {
            Logins logins = loginsService.GetAccount(loginsModel.NameAccount);
            logins.NameAccount = logins.NameAccount ;
            logins.Password = loginsModel.Password;

            Ok(new { status = true, });
            loginsService.updateLogin(logins);
            return Ok(new { status = true, message = "UPDATE SUCCESS", data = logins });

        }
    }
}
