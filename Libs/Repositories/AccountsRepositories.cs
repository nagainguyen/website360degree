using Libs.Data;
using Libs.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.IAccountsRepository;
namespace Libs.Repositories
{
    public interface IAccountsRepository : IRepository<Accounts>
    {
        //code...khai bao
        public void insertAccounts(Accounts accounts);
        public void deleteAccounts(Accounts accounts);
        public void updateAccounts(Accounts accounts);
        public class AccountsRepository : RepositoryBase<Accounts>, IAccountsRepository
        {
            public AccountsRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
            }

            public void insertAccounts(Accounts accounts)
            {
                _dbContext.Accounts.Add(accounts);
            }
            public void deleteAccounts(Accounts accounts)
            {
                _dbContext.Accounts.Remove(accounts);
            }
            public void updateAccounts(Accounts accounts)
            {
                _dbContext.Accounts.Update(accounts);
            }


        }
    }
}