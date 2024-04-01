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
        [Route("InsertAreas")]
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

        [HttpDelete]
        [Route("DeleteAreas")]
        public IActionResult DeleteAreas(Guid CodeAreas)
        {
            AreasService.deleteAreas(CodeAreas);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }

        [HttpPost]
        [Route("UpadateAreas")]
        public IActionResult UpdateAreas(AreasModel areasModel)
        {
            try
            {
                Areas areas = AreasService.GetAreasByCode(areasModel.CodeAreas);
                if (areas == null)
                {
                    return NotFound(new { status = false, message = "Area not found" });
                }
                areas.IDAreas = areasModel.IDAreas;
                areas.NameAreas = areasModel.NameAreas;
              
                AreasService.updateAreas(areas);
                return Ok(new { status = true, message = "Update success", data = areas });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Error: {ex.Message}" });
            }
        }


    }
    }
