using Azure;
using Libs.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.IScenesRepository;

namespace Libs.Service
{
    public class ScenesService
    {
        private ApplicationDbContext applicationDbContext;
        private ScenesRepository scenesRepository;

        public ScenesService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.scenesRepository = new ScenesRepository(applicationDbContext);
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertScenes(Scenes scenes)
        {
            scenesRepository.insertScenes(scenes);
            Save();
        }
        ///
        public List<Scenes> GetListsScenes()
        {
            return applicationDbContext.Scenes.ToList();
        }
        public async Task<List<Scenes>> GetScenesListsAsync()
        {
            return await applicationDbContext.Scenes.ToListAsync();
        }

        public async Task<List<Scenes>> GetScenesByLocationIDAsync(string locationID)
        {
            // Lấy danh sách các cảnh có LocationID trùng khớp với tham số locationID
            return await applicationDbContext.Scenes
                .Where(scene => scene.IDLocations == locationID)
                .ToListAsync();
        }

        //
        public Scenes GetScenesByCode(Guid code)
        {
            return applicationDbContext.Scenes.FirstOrDefault(x => x.CodeScenes == code);
        }
        
        //public Areas GetScensByString(string searchString)
        //{
        //    return applicationDbContext.Scenes.FirstOrDefault(x => x.IDAreas.Equals(searchString));
        //}
        ///
        public void deleteScenesByCode(Guid code)
        {
            Scenes scenes = applicationDbContext.Scenes.FirstOrDefault(x => x.CodeScenes.Equals(code));
           
            scenesRepository.deleteScenes(scenes);
            Save();
        }
        //
        public void updateScenes(Scenes scenes)
        {
            Scenes sceness = applicationDbContext.Scenes.FirstOrDefault(x => x.CodeScenes == scenes.CodeScenes);
            scenesRepository.updateScenes(sceness);
            Save();

        }
    }
}
