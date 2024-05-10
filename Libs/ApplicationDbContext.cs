using Libs.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Libs
{
    public class ApplicationDbContext : IdentityDbContext
    {
        
        public DbSet<Scenes> Scenes { get; set; }
        public DbSet<HotSpots> HotSpots { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<Locations> Locations { get; set; }
        public DbSet<Areas> Areas { get; set; }
        public DbSet<Token> Token { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

    }
}