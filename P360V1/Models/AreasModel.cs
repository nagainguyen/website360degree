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
    public class AreasModel
    {
        public AreasModel(Guid CodeAreas,  string NameAreas, string IDAreas, string UrlImageAreas, string CodeAccount)
        {
            this.CodeAreas = CodeAreas;
            this.NameAreas = NameAreas;
            this.IDAreas = IDAreas;
            this.UrlImageAreas = UrlImageAreas;
            this.CodeAccount = CodeAccount;
        }
        public AreasModel()
        {
            this.CodeAreas = Guid.Empty;
            this.NameAreas = string.Empty;
            this.IDAreas = string.Empty;
            this.UrlImageAreas = string.Empty;
            this.CodeAccount = string.Empty;

        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CodeAreas { get; set; }
        public string IDAreas { get; set; }
        public string NameAreas { get; set; }
        public string UrlImageAreas { get; set; }
        public string CodeAccount { get; set; }

    }
}
