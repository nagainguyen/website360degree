
using Microsoft.AspNetCore.Mvc;
using Libs.Entity;
using Libs.Service;

namespace AreaController.Controllers
{
    public class AreaController : Controller
    {
        private readonly AreasService _areasService;

        public AreaController(AreasService areasService)
        {
            _areasService = areasService;
        }

        // GET: Areas
        public async Task<IActionResult> Index()
        {
            var areas = await _areasService.GetAllAreasAsync();
            return View(areas);
        }

        // GET: Areas/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Areas/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Areas areasModel)
        {
            if (ModelState.IsValid)
            {
                _areasService.insertAreas(areasModel);
                return RedirectToAction(nameof(Index));
            }
            return View(areasModel);
        }

        // Other actions for editing and deleting areas
    }
}
