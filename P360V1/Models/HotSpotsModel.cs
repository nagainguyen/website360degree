using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Entity
{
    public class HotSpotsModel
    {
        public HotSpotsModel(Guid CodeHotSpots, string ScenesID, string IDNextScenes, string Text, float pitch, float yaw)
        {
            this.CodeHotSpots = CodeHotSpots;
            this.ScenesID = ScenesID;
            this.IDNextScenes = IDNextScenes;
            this.text = Text;
            this.pitch = pitch;
            this.yaw = yaw;

        }
        public HotSpotsModel()
        {
            this.CodeHotSpots = Guid.Empty;
            this.ScenesID = string.Empty;
            this.IDNextScenes = string.Empty;
            this.text = string.Empty;
            this.pitch = 0;
            this.yaw = 0;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CodeHotSpots { get; set; }
        public string ScenesID { get; set; }
        public string IDNextScenes { get; set; }
        public string text { get; set; }
        public double pitch { get; set; }
        public double yaw { get; set; }
    }


}
