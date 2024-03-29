using Libs.Entity;
using static Libs.Repositories.ILoginsRepository;

namespace Libs.Service
{
    public class LoginsService
    {
        private ApplicationDbContext applicationDbContext;
        private LoginsRepository loginsRepository;

        public LoginsService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.loginsRepository = new LoginsRepository(applicationDbContext);
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertLogins(Logins logins)
        {
            loginsRepository.insertLogins(logins);
            Save();
        }
        ///
        public List<Logins> GetListAccounts()
        {
            return applicationDbContext.Logins.ToList();
        }
        //
        public Logins GetAccount(string Account)
        {
            return applicationDbContext.Logins.FirstOrDefault(x => x.NameAccount == Account );
        }
        ///
        public void deleteLogins(string Account)
        {
            Logins dn = applicationDbContext.Logins.FirstOrDefault(x => x.NameAccount.Equals(Account));

            loginsRepository.deleteLogins(dn);
            Save();
        }
        //
        public void updateLogin(Logins logins)
        {
            Logins loginss = applicationDbContext.Logins.FirstOrDefault(x => x.CodeAccount == logins.CodeAccount );
            loginsRepository.updateLogins(loginss);
            Save();

        }
    }
}