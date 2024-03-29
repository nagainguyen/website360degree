using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Entity
{
    public class ScenesModel
    {
        public ScenesModel(Guid CodeScenes, string IDLocations, String IDScenes, string TitleScenes, String UrlScenes, float PitchScenes, float YawScenes)
        {
            this.CodeScenes = CodeScenes;
            this.IDLocations =  IDLocations;
            this.IDScenes = IDScenes;
            this.TitleScenes= TitleScenes;
            this.UrlScenes = UrlScenes;
            this.PitchScenes = PitchScenes;
            this.YawScenes = YawScenes;
        }
        public ScenesModel()
        {
            this.CodeScenes = Guid.Empty;
            this.IDLocations = string.Empty;
            this.IDScenes  = String.Empty;
            this.TitleScenes = String.Empty;
            this.UrlScenes = string.Empty;
            this.PitchScenes = 0;
            this.YawScenes = 0;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CodeScenes { get; set; }

        public string IDLocations { get; set; }
        public String? IDScenes { get; set; }
        public string TitleScenes { get; set; }
        public String? UrlScenes { get; set; }
        public double PitchScenes { get; set; }
        public double YawScenes { get; set; }


    }


}
