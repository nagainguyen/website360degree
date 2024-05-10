using Libs.Data;
using Libs.Entity;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libs.Repositories
{
    public interface ITokenRepositories : IRepository<Token>
    {
        public void insertToken(Token token);
        public void deleteToken(Token token);
        Token searchToken(Token token);

        public class TokenRepositories : RepositoryBase<Token>, ITokenRepositories
        {
            public TokenRepositories(ApplicationDbContext dbContext) : base(dbContext)
            {
            }

            public void insertToken(Token token)
            {
                _dbContext.Token.Add(token);
            }
            public Token searchToken(Token token)
            {
                return _dbContext.Token.FirstOrDefault(t => t.IDAccount == token.IDAccount && t.ValueToken == token.ValueToken && t.ExpriDate > DateTime.Now);
            }

            public void deleteToken(Token token)
            {
                _dbContext.Token.Remove(token);
            }
        }
    }
}
