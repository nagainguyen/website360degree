using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net.Mail;
using System;
using MimeKit;
using System.Net;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private AccountsService accountsService;
        private TokenService tokenService;

        public AccountsController(AccountsService accountsService, TokenService tokenService)
        {
            this.accountsService = accountsService;
            this.tokenService = tokenService;
        }
        /// <summary>
        /// ///////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        //private string GenerateResetToken()
        //{
        //    return Guid.NewGuid().ToString();
        //}

        //private void SendResetPasswordEmail(string email, string resetPasswordLink, string userName, string resetToken)
        //{
        //    // Implement email sending logic here
        //}

        //[HttpPost]
        //[Route("ResetPassword")]
        //public IActionResult ResetPassword(string email)
        //{
        //    var user = accountsService.GetAccountsByEmail(email);
        //    if (user == null)
        //    {
        //        return NotFound("User not found");
        //    }

        //    // Tạo mã token và lưu vào cơ sở dữ liệu
        //    string resetToken = GenerateResetToken();
        //    var token = new Token
        //    {
        //        IDAccount = user.CodeAccount.ToString(),
        //        ValueToken = resetToken,
        //        ExpriDate = DateTime.Now.AddMinutes(30) // Thời gian hết hạn là 30 phút
        //    };

        //    tokenService.insertToken(token);

        //    // Gửi email đến người dùng với đường dẫn đặt lại mật khẩu
        //    string resetPasswordLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/reset-password?email={email}&token={resetToken}";
        //    SendResetPasswordEmail(email, resetPasswordLink, user.NameAccount, resetToken);

        //    return Ok("Reset password email sent successfully");
        //}

        //[HttpPost]
        //[Route("SetNewPassword")]
        //public IActionResult SetNewPassword(TokenModel tokenModel)
        //{
        //    Accounts accounts = accountsService.GetAccountsByEmail(tokenModel.IDAccount);
        //    if (accounts == null)
        //    {
        //        return NotFound("User not found");
        //    }
        
        //    // Kiểm tra mã token và thời gian hết hạn
        //    var resetPasswordToken = tokenService.searchToken(tokenModel);
        //    if (resetPasswordToken == null)
        //    {
        //        return BadRequest("Invalid or expired token");
        //    }

        //    // Đặt lại mật khẩu
        //    accounts.Password = tokenModel.NewPassword;
        //    accountsService.UpdateAccounts(user);

        //    // Xóa mã token đã sử dụng
        //    tokenService.DeleteToken(resetPasswordToken);

        //    return Ok("Password reset successfully");
        //}
        //////////////////////////////////////////////////////////////////

        [HttpPost]
        [Route("InsertAccount")]
        public IActionResult insertAccount(AccountsModel accountsModel)
        {
            Accounts accounts = new Accounts();

            accounts.Email = accountsModel.Email;
            accounts.NameAccount = accountsModel.NameAccount;
            accounts.Password = accountsModel.Password;
            accounts.Status = "Admin";
            accounts.renemberLogin = accountsModel.renemberLogin;
            accounts.CustomCode = "Admin";

            accountsService.insertAccounts(accounts);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }
        [HttpPost]
        [Route("InsertUserAccount")]
        public IActionResult insertUserAccount(AccountsModel accountsModel)
        {
            Accounts accounts = new Accounts();

            accounts.Email = accountsModel.Email;
            accounts.NameAccount = accountsModel.NameAccount;
            accounts.Password = accountsModel.Password;
            accounts.Status = "Admin";
            accounts.renemberLogin = accountsModel.renemberLogin;
            accounts.CustomCode = accounts.CustomCode;

            accountsService.insertAccounts(accounts);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }

        [HttpPost]
        [Route("LoginsAccount")]
        public async Task<IActionResult> LoginAccount(AccountsModel accountsModel)
        {
            Accounts accounts = accountsService.GetAccountsByEmail(accountsModel.Email);
            if (accounts != null && accounts.Password.Equals(accountsModel.Password))
            {
                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential("nvtruong.it.02@gmail.com", "ktcs tons mxyf nbnb"),
                    EnableSsl = true
                };
                client.Send("nvtruong.it.02@gmail.com", "thanhlochuynh102@gmail.com", "test", "testbody");
                
                //HttpContext.Session.SetString("FullName", accounts.NameAccount);
                //HttpContext.Session.SetString("Email", accounts.Email);
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.NameIdentifier, Convert.ToString(accounts.CodeAccount)),
                    new Claim(ClaimTypes.Name, accounts.NameAccount),
                    new Claim(ClaimTypes.Email, accounts.Email),
                 
                    new Claim(ClaimTypes.Role, accounts.Status)
                };

                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, 
                    new AuthenticationProperties()
                    {
                        IsPersistent = accountsModel.renemberLogin
                    });

                return Ok(new
                {
                    status = true,
                    message = "Login success"
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

        public async Task<IActionResult> LogoutAccount()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return LocalRedirect("/");
        }




        [HttpGet]
        [Route("ListAccount")]
        public IActionResult GetListAccount()
        {

            List<Accounts> listAccount = accountsService.GetListAccounts();
            return Ok(new { status = true, message = "SUCCESS", data = listAccount });
        }

        [HttpGet]
        [Route("inforAccount")]
        public IActionResult GetInforAccount(AccountsModel accountModel)
        {
            Accounts accounts = accountsService.GetAccountsByCode(accountModel.CodeAccount);
            return Ok(new { status = true, message = "SUCCESS", data = accounts });
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
