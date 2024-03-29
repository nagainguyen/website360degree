using Libs.Entity;
using Libs.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.IHotSpotsRepository;

namespace Libs.Service
{
    public class HotSpotsService
    {
        private ApplicationDbContext applicationDbContext;
        private HotSpotsRepository hotSpotsRepository;

        public HotSpotsService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.hotSpotsRepository = new HotSpotsRepository(applicationDbContext);
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertHotSpot(HotSpots hotspots)
        {
            hotSpotsRepository.insertHotSpots(hotspots);
            Save();
        }
        ///
        public List<HotSpots> GetHotSpotLists()
        {
            return applicationDbContext.HotSpots.ToList();
        }
        //
        public HotSpots getHotSpost(Guid code)
        {
            return applicationDbContext.HotSpots.FirstOrDefault(x => x.CodeHotSpots == code);
        }
        public async Task<List<HotSpots>> GetAllHotSpotsAsync()
        {
            return await applicationDbContext.HotSpots.ToListAsync();
        }


        ///
        public void deleteHotSpot(Guid Code)
        {
            HotSpots hotspots = applicationDbContext.HotSpots.FirstOrDefault(x => x.CodeHotSpots.Equals(Code));

            hotSpotsRepository.deleteHotSpots(hotspots);
            Save();
        }
        //
        public void updateHotSpot(HotSpots hotSpots)
        {
            HotSpots hotspots = applicationDbContext.HotSpots.FirstOrDefault(x => x.CodeHotSpots == hotSpots.CodeHotSpots);
            hotSpotsRepository.updateHotSpots(hotspots);
            Save();

        }
    }
}
