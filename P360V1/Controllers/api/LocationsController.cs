using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private LocationsService locationsService;

        public LocationsController(LocationsService locationsService)
        {
            this.locationsService = locationsService;
        }


        [HttpPost]
        [Route("InsertLocations")]
        public IActionResult inserLocations(LocationsModel locationsModel)
        {
            Locations locations = new Locations();

            locations.NameLocations = locationsModel.NameLocations;
            locations.IDLocations = locationsModel.IDLocations;
            locations.IDAreas = locationsModel.IDAreas;
            locations.UrlImageLocations = locationsModel.UrlImageLocations;

            locationsService.insertLocations(locations);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }

        [HttpGet]
        [Route("ListLocations")]
        public IActionResult GetListLocations()
        {

            List<Locations> ListLocations = locationsService.GetLocations();
            return Ok(new { status = true, message = "SUCCESS", data = ListLocations });
        }

        [HttpDelete]
        [Route("DeleteLocations")]
        public IActionResult deleteLocations(Guid codeLocations)
        {
            locationsService.deleteLocationByCode(codeLocations);
            return Ok(new { status = true, message = "DELETE SUCCESS" });

           
        }

        [HttpPost]
        [Route("UpdateLocations")]
        public IActionResult updateLocations(LocationsModel locationsModel)
        {
            Locations locations = locationsService.GetLocationsByCode(locationsModel.CodeLocations);

            locations.NameLocations = locationsModel.NameLocations;
            locations.IDLocations = locationsModel.IDLocations;
            locations.IDAreas = locationsModel.IDAreas;
            locations.UrlImageLocations = locationsModel.UrlImageLocations;

            Ok(new { status = true, });
            locationsService.updateLocations(locations);
            return Ok(new { status = true, message = "", data = locations });

        }

    }
}
