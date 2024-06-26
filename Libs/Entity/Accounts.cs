﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Libs.Entity
{
    public class Accounts
    {
        public Accounts(Guid CodeAccount, string NameAccount, string Password, string Email, string Status, bool rememberLogin, string CustomCode)
        {
            this.CodeAccount = CodeAccount;
            this.NameAccount = NameAccount;
            this.Password = Password;
            this.Email = Email;
            this.Status = Status;
            this.renemberLogin = renemberLogin;
            this.CustomCode = CustomCode;

        }
        public Accounts()
        {
            this.CodeAccount = Guid.Empty;
            this.NameAccount = string.Empty;
            this.Password = string.Empty;
            this.Email = string.Empty ;
            this.Status = string.Empty;
            this.renemberLogin = false;
            this.CustomCode = string.Empty;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public Guid CodeAccount { get; set; }
        public string Email { get; set; }
        public string NameAccount { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public bool renemberLogin { get; set; }
        public string? CustomCode { get; set; }
    }
}
