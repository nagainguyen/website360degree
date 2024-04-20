using Libs.Entity;
using Microsoft.EntityFrameworkCore;
using static Libs.Repositories.IAccountsRepository;

namespace Libs.Service
{
    public class AccountsService
    {
        private ApplicationDbContext applicationDbContext;
        private AccountsRepository accountsRepository;

        public AccountsService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.accountsRepository = new AccountsRepository(applicationDbContext);
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertAccounts(Accounts accounts)
        {
            accountsRepository.insertAccounts(accounts);
            Save();
        }
        ///
        public List<Accounts> GetListAccounts()
        {
            return applicationDbContext.Accounts.ToList();
        }
        //
        public async Task<List<Accounts>> GetAllAccountsAsync()
        {
            return await applicationDbContext.Accounts.ToListAsync();
        }
        //
        public Accounts GetAccountsByEmail(string Email)
        {
            return applicationDbContext.Accounts.FirstOrDefault(x => x.Email == Email );
        }

        public Accounts GetAccountsByCode(Guid Code)
        {
            return applicationDbContext.Accounts.FirstOrDefault(x => x.CodeAccount == Code);
        }
        ///
        public void deleteAccounts(Guid Code)
        {
            Accounts accounts = applicationDbContext.Accounts.FirstOrDefault(x => x.CodeAccount.Equals(Code));

            accountsRepository.deleteAccounts(accounts);
            Save();
        }
        //
        public void updateAccounts(Accounts accounts)
        {
            Accounts accountss = applicationDbContext.Accounts.FirstOrDefault(x => x.CodeAccount == accounts.CodeAccount );
            accountsRepository.updateAccounts(accountss);
            Save();

        }

    }
}