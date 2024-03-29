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
    public interface ILocationsRepository : IRepository<Locations>
    {
        
        public void insertLocations(Locations locations);
        public void deleteLocations(Locations locations);
        public void updateLocations(Locations locations);
        public class LocationsRepository : RepositoryBase<Locations>, ILocationsRepository
        {
            public LocationsRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }

            public void deleteLocations(Locations locations)
            {
                _dbContext.Locations.Remove(locations);
            }

            public void insertLocations(Locations locations)
            {
                _dbContext.Locations.Add(locations);
            }

            public void updateLocations(Locations locations)
            {
                _dbContext.Locations.Update(locations);
            }
       

        }
    }
}
