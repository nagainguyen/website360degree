using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Entity
{
    public class Token
    {
        public Token(Guid CodeToken, string IDAccount, string ValueToken, DateTime ExpriDate)
        {
           this.CodeToken = CodeToken;
            this.IDAccount = IDAccount;
            this.ValueToken = ValueToken;
            this.ExpriDate = ExpriDate;
        }
        public Token()
        {
            this.CodeToken = Guid.Empty;
            this.IDAccount = string.Empty;
            this.ValueToken = string.Empty;
            this.ExpriDate = DateTime.MinValue;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CodeToken { get; set; }
        public string IDAccount { get; set; }
        public string ValueToken { get; set; }
        public DateTime ExpriDate { get; set; }
    }
}
