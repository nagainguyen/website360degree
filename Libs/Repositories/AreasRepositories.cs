using Libs.Data;
using Libs.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Libs.Repositories
{
    public interface IAreasRepository : IRepository<Areas>
    {
        public void insertAreas(Areas areas);
        public void deleteAreas(Areas areas);
        public void updateAreas(Areas areas);
        public class AreasRepository : RepositoryBase<Areas>, IAreasRepository
        {
            public AreasRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }
          
            public void insertAreas(Areas areas)
            {
                _dbContext.Areas.Add(areas);
            }

            public void deleteAreas(Areas areas)
            {
                _dbContext.Areas.Remove(areas);
            }

            public void updateAreas(Areas areas)
            {
                _dbContext.Areas.Update(areas);
            }
        }
    }
}
