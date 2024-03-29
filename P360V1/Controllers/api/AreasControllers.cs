using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreasController : ControllerBase
    {
        private AreasService AreasService;

        public AreasController(AreasService AreasService)
        {
            this.AreasService = AreasService;
        }


        [HttpPost]
        [Route("InserAreas")]
        public IActionResult insertAreas(AreasModel areasModel)
        {
            Areas areas = new Areas(); 
            areas.NameAreas = areasModel.NameAreas;
            areas.IDAreas = areasModel.IDAreas;


                AreasService.insertAreas(areas);
                return Ok(new { status = true, message = "INSERT SUCCESS" });
            }
        [HttpGet]
        [Route("ListAreas")]
        public IActionResult GetAreas()
        {

            List<Areas> DiadiemLists = AreasService.GetAreas();
            return Ok(new { status = true, message = "SUCCESS", data = DiadiemLists });
        }

        [HttpPost]
        [Route("DeleteAreas")]
        public IActionResult DeleteAreas(AreasModel areasModel)
        {
            AreasService.deleteAreas(areasModel.CodeAreas);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }

        [HttpPost]
        [Route("UpadateAreas")]
        public IActionResult UpdateAreas(AreasModel areasModel)
        {
            Areas areas = AreasService.GetAreasByCode(areasModel.CodeAreas);

            areas.NameAreas = areasModel.NameAreas;
            areas.IDAreas = areasModel.IDAreas;

            Ok(new { status = true, });
            AreasService.updateAreas(areas);
            return Ok(new { status = true, message = "", data = areas });

        }


    }
    }
