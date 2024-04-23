using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private AccountsService accountsService;

        public AccountsController(AccountsService accountsService)
        {
            this.accountsService = accountsService;
        }

        [HttpPost]
        [Route("InsertAccount")]
        public IActionResult insertAccount(AccountsModel accountsModel)
        {
            Accounts accounts = new Accounts();

            accounts.Email = accountsModel.Email;
            accounts.NameAccount = accountsModel.NameAccount;
            accounts.Password = accountsModel.Password;
            accounts.Status = accountsModel.Status;


            accountsService.insertAccounts(accounts);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }
        [HttpPost]
        [Route("LoginsAccount")]
        public IActionResult LoginAccount(AccountsModel accountsModel)
        {
            Accounts accounts = accountsService.GetAccountsByEmail(accountsModel.Email);
            if (accounts != null && accounts.Password.Equals(accountsModel.Password))
            {
                //HttpContext.Session.SetString("FullName", accounts.NameAccount);
                //HttpContext.Session.SetString("Email", accounts.Email);
          
                return Ok(new
                {
                    status = true,
                    message = "Login successful",
                    
                   
                });
            }
            else
            {
                return BadRequest(new
                {
                    status = false,
                    message = "Invalid email or password"
                });
            }
        }


        [HttpGet]
        [Route("ListAccount")]
        public IActionResult GetListAccount()
        {

            List<Accounts> listAccount = accountsService.GetListAccounts();
            return Ok(new { status = true, message = "SUCCESS", data = listAccount });
        }


        [HttpPost]
        [Route("UpdateAccount")]
        public IActionResult updateAccount(AccountsModel accountsModel)
        {
            Accounts accounts = accountsService.GetAccountsByCode(accountsModel.CodeAccount);      
            if (accounts == null)
            {
                return NotFound(); 
            }
        
            accounts.Email = accountsModel.Email;
            accounts.NameAccount = accountsModel.NameAccount;
            accounts.Password = accountsModel.Password;
            accounts.Status = accountsModel.Status;

            accountsService.updateAccounts(accounts);

            return Ok(new { status = true, message = "UPDATE SUCCESS", data = accounts });
        }


        [HttpDelete]
        [Route("DeleteAccount")]
        public IActionResult DeleteAccount(Guid CodeAccount)
        {
            accountsService.deleteAccounts(CodeAccount);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }

    }
}
