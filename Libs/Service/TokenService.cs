using Libs.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Libs.Repositories.ITokenRepositories;

namespace Libs.Service
{
    public class TokenService
    {
        private ApplicationDbContext applicationDbContext;
        private TokenRepositories tokenRepository;

        public TokenService(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
            this.tokenRepository = new TokenRepositories(applicationDbContext);
        }
        public void Save()
        {
            this.applicationDbContext.SaveChanges();
        }
        ///
        public void insertToken(Token token)
        {
            tokenRepository.insertToken(token);
            Save();
        }
        ///       
        public Token searchToken(string token)
        {
            return applicationDbContext.Token.FirstOrDefault(x => x.ValueToken == token);
        }
        ///
        public void deleteToken(Guid Code)
        {
            Token token = applicationDbContext.Token.FirstOrDefault(x => x.CodeToken.Equals(Code));

            tokenRepository.deleteToken(token);
            Save();
        }
        //

    }
}
