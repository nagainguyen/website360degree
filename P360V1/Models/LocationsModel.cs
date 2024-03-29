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
    public class LocationsModel 
    {
        public LocationsModel(Guid CodeLocations, string NameLocations, string IDLocations, string IDAreas)
        {
            this.CodeLocations = CodeLocations;
            this.NameLocations = NameLocations;
            this.IDLocations = IDLocations;
            this.IDAreas=IDAreas;
        }
        public LocationsModel()
        {
            this.CodeLocations = Guid.Empty;
            this.NameLocations = string.Empty;
            this.IDLocations = string.Empty;
            this.IDAreas = string.Empty;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CodeLocations { get; set; }
        public string NameLocations { get; set; }
        public string IDLocations { get; set; }
        public string IDAreas { get; set; } 

    }
}
