using Libs.Data;
using Libs.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Libs.Repositories
{
    public interface ILoginsRepository : IRepository<Logins>
    {
        //code...khai bao
        public void insertLogins(Logins logins);
        public void deleteLogins(Logins logins);
        public void updateLogins(Logins logins);
        public class LoginsRepository : RepositoryBase<Logins>, ILoginsRepository
        {
            public LoginsRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }

            public void insertLogins(Logins logins)
            {
                _dbContext.Logins.Add(logins);
            }
            public void deleteLogins(Logins logins)
            {
                _dbContext.Logins.Remove(logins);
            }
            public void updateLogins(Logins logins)
            {
                _dbContext.Logins.Update(logins);
            }


        }
    }
}