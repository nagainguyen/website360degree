using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Libs.Entity
{
    public class Logins
    {
        public Logins(Guid CodeAccount, string NameAccount, string Password)
        {
            this.CodeAccount = CodeAccount;
            this.NameAccount = NameAccount;
            this.Password = Password;

        }
        public Logins()
        {
            this.CodeAccount = Guid.Empty;
            this.NameAccount = string.Empty;
            this.Password = string.Empty;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public Guid CodeAccount { get; set; }
        public string NameAccount { get; set; }
        public string Password { get; set; }

    }
}
