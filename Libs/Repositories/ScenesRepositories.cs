using Libs.Data;
using Libs.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Repositories
{
    public interface IScenesRepository : IRepository<Scenes>
    {
        //code...khai bao
        public void insertScenes(Scenes scenes);
        public void deleteScenes(Scenes scenes);
        public void updateScenes(Scenes scenes);
        public class ScenesRepository : RepositoryBase<Scenes>, IScenesRepository
        {
            public ScenesRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }
            public void insertScenes(Scenes scenes) {
                _dbContext.Scenes.Add(scenes);
            }

            public void deleteScenes(Scenes scenes) {
                _dbContext.Scenes.Remove(scenes);
            }
            public void updateScenes(Scenes scenes) {
                _dbContext.Scenes.Update(scenes);
            }
            
        }
    }
}
