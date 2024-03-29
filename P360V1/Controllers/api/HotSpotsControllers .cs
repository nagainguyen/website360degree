using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotSpotsController : ControllerBase
    {
        private HotSpotsService hotSpotsService;

        public HotSpotsController(HotSpotsService hotSpotsService)
        {
            this.hotSpotsService = hotSpotsService;
        }


        [HttpPost]
        [Route("InsertHotSpot")]
        public IActionResult insertHotSpot(HotSpotsModel hotSpotModel)
        {
           HotSpots hotSpot = new HotSpots();
           
            hotSpot.ScenesID = hotSpotModel.ScenesID;
            hotSpot.IDNextScenes = hotSpotModel.IDNextScenes;
            hotSpot.text = hotSpotModel.text;
            hotSpot.pitch = hotSpotModel.pitch;
            hotSpot.yaw = hotSpotModel.yaw;
            //if (images == null || string.IsNullOrEmpty(images.name) || string.IsNullOrEmpty(images.idImage) || string.IsNullOrEmpty(images.linkImage))
            //{
            //    return BadRequest(new { status = false, message = "Invalid or missing data" });
            //}
            hotSpotsService.insertHotSpot(hotSpot);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }

        [HttpGet]
        [Route("ListHotSpots")]
        public IActionResult GetHotSpotLists()
        {

            List<HotSpots> HotSpotLists = hotSpotsService.GetHotSpotLists();
            return Ok(new { status = true, message = "SUCCESS", data = HotSpotLists });
        }
       

        [HttpDelete]
        [Route("DeleteHotSpots")]
        public IActionResult deleteHotSpot(Guid CodeHotSpots)
        {
            hotSpotsService.deleteHotSpot(CodeHotSpots);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }

        [HttpPost]
        [Route("UpdateHotSpot")]
        public IActionResult updateHotSpot(HotSpotsModel hotSpotsModel)
        {
            try
            {
                HotSpots hotSpot = hotSpotsService.getHotSpost(hotSpotsModel.CodeHotSpots);
                if (hotSpot == null)
                {
                    return NotFound(new { status = false, message = "Image not found" });
                }
                hotSpot.ScenesID = hotSpotsModel.ScenesID;
                hotSpot.IDNextScenes = hotSpotsModel.IDNextScenes;
                hotSpot.text = hotSpotsModel.text;
                hotSpot.pitch = hotSpotsModel.pitch;
                hotSpot.yaw = hotSpotsModel.yaw;

                hotSpotsService.updateHotSpot(hotSpot);
                return Ok(new { status = true, message = "Update success", data = hotSpot });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Error: {ex.Message}" });
            }
        }


    }
}
