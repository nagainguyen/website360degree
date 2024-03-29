using Libs.Entity;
using Libs.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.ILocationsRepository;

namespace Libs.Service
{
    public class LocationsService
    {
        private ApplicationDbContext applicationDbContext;
        private LocationsRepository locationsRepository;

        public LocationsService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.locationsRepository = new LocationsRepository(applicationDbContext);
        }

        public async Task<List<Locations>> GetLocationsListsAsync()
        {
            return await applicationDbContext.Locations.ToListAsync();
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertLocations(Locations locations)
        {
            locationsRepository.insertLocations(locations);
            Save();
        }
        ///
        public List<Locations> GetLocations()
        {
            return applicationDbContext.Locations.ToList();
        }

        public async Task<List<Locations>> GetAllLocationsAsync()
        {
            return await applicationDbContext.Locations.ToListAsync();
        }
        //
        public Locations GetLocationsByCode(Guid code)
        {
            return applicationDbContext.Locations.FirstOrDefault(x => x.CodeLocations == code);
        }
        public Locations GetLocationsByID(String strings)
        {
            return applicationDbContext.Locations.FirstOrDefault(x => x.CodeLocations.Equals(strings));
        }
       
        ///
        public void deleteLocationByCode(Guid code)
        {
           Locations locations = applicationDbContext.Locations.FirstOrDefault(x => x.CodeLocations.Equals(code));

            locationsRepository.deleteLocations(locations);
            Save();
        }
        //
        public void updateLocations(Locations locations)
        {
            Locations locationss = applicationDbContext.Locations.FirstOrDefault(x => x.CodeLocations == locations.CodeLocations);
            locationsRepository.updateLocations(locationss);
            Save();

        }
    }
}