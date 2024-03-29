using Libs.Data;
using Libs.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Repositories
{
    public interface IHotSpotsRepository : IRepository<HotSpots>
    {
        public void insertHotSpots(HotSpots hotspots);
        public void deleteHotSpots(HotSpots hotspots);
        public void updateHotSpots(HotSpots hotspots);
        public class HotSpotsRepository : RepositoryBase<HotSpots>, IHotSpotsRepository
        {
            public HotSpotsRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }
           
            public void insertHotSpots(HotSpots hotspots)
            {
                _dbContext.HotSpots.Add(hotspots);
            }

            public void deleteHotSpots(HotSpots hotspots)
            {
                _dbContext.HotSpots.Remove(hotspots);
            }

            public void updateHotSpots(HotSpots hotspots)
            {
                _dbContext.HotSpots.Update(hotspots);
            }


        }
    }
}
