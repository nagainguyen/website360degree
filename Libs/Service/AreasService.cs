using Libs.Entity;
using Libs.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.IAreasRepository;

namespace Libs.Service
{
    public class AreasService
    {
        private ApplicationDbContext applicationDbContext;
        private AreasRepository areasRepository;

        public AreasService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.areasRepository = new AreasRepository(applicationDbContext);
        }

        public async Task<List<Areas>> GetAreasListsAsync()
        {
            return await applicationDbContext.Areas.ToListAsync();
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertAreas(Areas areas)
        {
            areasRepository.insertAreas(areas);
            Save();
        }
        ///
        public List<Areas> GetAreas()
        {
            return applicationDbContext.Areas.ToList();
        }
        //
        public Areas GetAreasByCode(Guid code)
        {
            return applicationDbContext.Areas.FirstOrDefault(x => x.CodeAreas == code);
        }
        //
        public Areas GetAreasByString(string searchString)
        {
            return applicationDbContext.Areas.FirstOrDefault(x => x.IDAreas.Equals(searchString));
        }

        public async Task<List<Areas>> GetAllAreasAsync()
        {
            return await applicationDbContext.Areas.ToListAsync();
        }

        ///
        public void deleteAreas(Guid code)
        {
            Areas areas = applicationDbContext.Areas.FirstOrDefault(x => x.CodeAreas.Equals(code));

            areasRepository.deleteAreas(areas);
            Save();
        }
        //
        public void updateAreas(Areas areas)
        {
            Areas areass= applicationDbContext.Areas.FirstOrDefault(x => x.CodeAreas == areas.CodeAreas);
            areasRepository.updateAreas(areass);
            Save();

        }
        

    }
}