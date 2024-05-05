using Libs.Entity;
using Libs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static API.Controllers.api.ScenesController;
using static System.Formats.Asn1.AsnWriter;
using static System.Net.Mime.MediaTypeNames;

namespace API.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScenesController : ControllerBase
    {
        private AreasService AreasService;
        private LocationsService LocationsService;
        private ScenesService ScenesService;
        private HotSpotsService hotSpotsService;
        public ScenesController(ScenesService scenesService, HotSpotsService hotSpotsService, AreasService areasService, LocationsService locationsService)
        {
            this.ScenesService = scenesService;
            this.hotSpotsService = hotSpotsService;
            this.AreasService = areasService;
            this.LocationsService = locationsService;
        }


        [HttpPost]
        [Route("InsertScenes")]
        public IActionResult insertScenes(ScenesModel scenesModel)
        {
            Scenes scenes = new Scenes();

            scenes.CodeScenes = scenesModel.CodeScenes;
            scenes.IDLocations = scenesModel.IDLocations;
            scenes.IDScenes = scenesModel.IDScenes;
            scenes.TitleScenes = scenesModel.TitleScenes;
            scenes.UrlScenes = scenesModel.UrlScenes;
            scenes.PitchScenes = scenesModel.PitchScenes;
            scenes.YawScenes = scenesModel.YawScenes;


            ScenesService.insertScenes(scenes);
            return Ok(new { status = true, message = "INSERT SUCCESS" });
        }

        [HttpGet]
        [Route("ListScenes")]
        public IActionResult GetListsScenes()
        {

            List<Scenes> ListScenes = ScenesService.GetListsScenes();


            return Ok(new { status = true, message = "SUCCESS", data = ListScenes });
        }


        [HttpGet]
        [Route("GetAllScenesWithHotSpots")]
        public async Task<IActionResult> GetScenesWithHotSpots()
        {
            try
            {
                List<Scenes> scenes = await ScenesService.GetScenesListsAsync();
                List<HotSpots> allHotSpots = await hotSpotsService.GetAllHotSpotsAsync();

                List<ScenesWithHotSpots> scenesWithHotSpotsA = new List<ScenesWithHotSpots>();

                foreach (var scene in scenes)
                {
                    List<HotSpots> hotSpotsForScene = allHotSpots
                        .Where(x => x.ScenesID == scene.IDScenes)

                        .ToList();

                    ScenesWithHotSpots sceneWithHotSpots = new ScenesWithHotSpots
                    {

                        CodeScenes = scene.CodeScenes,
                        IDLocations = scene.IDLocations,
                        IDScenes = scene.IDScenes,
                        Title = scene.TitleScenes,
                        Url = scene.UrlScenes,
                        Pitch = scene.PitchScenes,
                        Yaw = scene.YawScenes,
                        HotSpots = hotSpotsForScene
                    };

                    scenesWithHotSpotsA.Add(sceneWithHotSpots);
                }

                return Ok(new { status = true, message = "SUCCESS", data = scenesWithHotSpotsA });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Lỗi: {ex.Message}" });
            }
        }

        [HttpGet]
        [Route("GetScenesAndHotspotWithIDLocations")]
        public async Task<IActionResult> GetScenesAndHotspotWithIDLocations(string locationID)
        {
            try
            {
                List<Scenes> scenes = await ScenesService.GetScenesByLocationIDAsync(locationID);
                List<HotSpots> allHotSpots = await hotSpotsService.GetAllHotSpotsAsync();
                List<ScenesWithHotSpots> scenesWithHotSpotsA = new List<ScenesWithHotSpots>();

                foreach (var scene in scenes)
                {
                    List<HotSpots> hotSpotsForScene = allHotSpots
                        .Where(x => x.ScenesID == scene.IDScenes)

                        .ToList();

                    ScenesWithHotSpots sceneWithHotSpots = new ScenesWithHotSpots
                    {

                        CodeScenes = scene.CodeScenes,
                        IDLocations = scene.IDLocations,
                        IDScenes = scene.IDScenes,
                        Title = scene.TitleScenes,
                        Url = scene.UrlScenes,
                        Pitch = scene.PitchScenes,
                        Yaw = scene.YawScenes,
                        HotSpots = hotSpotsForScene
                    };

                    scenesWithHotSpotsA.Add(sceneWithHotSpots);
                }

                return Ok(new { status = true, message = "SUCCESS", data = scenesWithHotSpotsA });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Lỗi: {ex.Message}" });
            }
        }





        [HttpDelete]
        [Route("DeleteScenes")]
        public IActionResult deleteScenes(Guid CodeScenes)
        {
            ScenesService.deleteScenesByCode(CodeScenes);
            return Ok(new { status = true, message = "DELETE SUCCESS" });
        }


        [HttpPost]
        [Route("UpdateScenes")]
        public IActionResult updateScenes(ScenesModel scenesModel)
        {
            try
            {
                Scenes scenes = ScenesService.GetScenesByCode(scenesModel.CodeScenes);
                if (scenes == null)
                {
                    return NotFound(new { status = false, message = "Scene not found" });
                }
                scenes.IDLocations  = scenesModel.IDLocations;
                scenes.IDScenes = scenesModel.IDScenes;
                scenes.TitleScenes = scenesModel.TitleScenes;
                scenes.UrlScenes = scenesModel.UrlScenes;
                scenes.PitchScenes = scenesModel.PitchScenes;
                scenes.YawScenes = scenesModel.YawScenes;


                ScenesService.updateScenes(scenes);
                return Ok(new { status = true, message = "Update success", data = scenes });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Error: {ex.Message}" });
            }
        }


        [HttpGet]
        [Route("GetAllWithAreasLocationsScenesHotSpots")]
        public async Task<IActionResult> GetAllWithAreasLocationsScenesHotSpots()
        {
            try
            {
                List<Areas> areas = await AreasService.GetAllAreasAsync();
                List<Locations> locations = await LocationsService.GetAllLocationsAsync();
                List<Scenes> scenes = await ScenesService.GetScenesListsAsync();
                List<HotSpots> allHotSpots = await hotSpotsService.GetAllHotSpotsAsync();

                List<ScenesWithHotSpotss> scenesWithHotSpotsA = new List<ScenesWithHotSpotss>();
                List<LocationsWithScenes> locationsWithScenes = new List<LocationsWithScenes>();
                List<AreasWithLocations> areasWithLocations = new List<AreasWithLocations>();

                foreach (var area in areas)
                {
                    List<Locations> locationsForArea = locations
                        .Where(x => x.IDAreas == area.IDAreas)
                        .ToList();
                    AreasWithLocations areasWithLocations1 = new AreasWithLocations
                    {
                        CodeAreas = area.CodeAreas,
                        IDAreas = area.IDAreas,
                        NameAreas = area.NameAreas,
                        Locations = new List<Locations>()
                    };

                    foreach (var location in locationsForArea)
                    {
                        List<Scenes> scenesForLocation = scenes
                            .Where(x => x.IDLocations == location.IDLocations)
                            .ToList();
                        LocationsWithScenes locationsWithScenes1 = new LocationsWithScenes
                        {
                            CodeLocations = location.CodeLocations,
                            IDAreas = location.IDAreas,
                            IDLocations = location.IDLocations,
                            NameLocations = location.NameLocations,
                            Scenes = scenesForLocation
                        };

                        foreach (var scene in scenesForLocation)
                        {
                            List<HotSpots> hotSpotsForScene = allHotSpots
                                .Where(x => x.ScenesID == scene.IDScenes)
                                .ToList();

                            ScenesWithHotSpotss sceneWithHotSpots = new ScenesWithHotSpotss
                            {
                                CodeScenes = scene.CodeScenes,
                                IDLocations = scene.IDLocations,
                                IDScenes = scene.IDScenes,
                                Title = scene.TitleScenes,
                                Url = scene.UrlScenes,
                                Pitch = scene.PitchScenes,
                                Yaw = scene.YawScenes,
                                HotSpots = hotSpotsForScene
                            };
                            scenesWithHotSpotsA.Add(sceneWithHotSpots);
                        }

                        
                    }

                    
                    
                }

                return Ok(new { status = true, message = "Thành công", data = areasWithLocations });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = false, message = $"Lỗi: {ex.Message}" });
            }
        }

        public class ScenesWithHotSpots
        {
            public Guid CodeScenes { get; set; }
            public string? IDLocations { get; set; }
            public string? IDScenes { get; set; }
            public string? Title { get; set; }
            public string? Url { get; set; }
            public double Pitch { get; set; }
            public double Yaw { get; set; }
            public List<HotSpots>? HotSpots { get; set; }
        }

        /// <summary>
        /// /////////
        /// </summary>
        public class ScenesWithHotSpotss
        {
            public Guid CodeScenes { get; set; }
            public string? IDLocations { get; set; }
            public string? IDScenes { get; set; }
            public string? Title { get; set; }
            public string? Url { get; set; }
            public double Pitch { get; set; }
            public double Yaw { get; set; }
            public List<HotSpots>? HotSpots { get; set; }
        }
        public class LocationsWithScenes
        {
            public Guid CodeLocations { get; set; }
            public string NameLocations { get; set; }
            public string IDLocations { get; set; }
            public string IDAreas { get; set; }
            public List<Scenes>? Scenes { get; set; }
        }

        public class AreasWithLocations
        {
            public Guid CodeAreas { get; set; }
            public string IDAreas { get; set; }
            public string NameAreas { get; set; }
            public List<Locations>? Locations { get; set; }
        }
    }
}
