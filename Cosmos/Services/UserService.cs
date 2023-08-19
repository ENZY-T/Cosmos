using System.Linq;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class UserService : IUserService
    {
        private readonly IDbClient _dbClient;

        public UserService(IDbClient dbClient)
        {
            _dbClient = dbClient;
        }

        public async Task<UserModel> Create(UserModel user)
        {
            return await _dbClient.InsertAsync("Users", user);
        }

        public async Task<UserModel> GetById(string objectIdStr)
        {
            return await _dbClient.GetById<UserModel>("Users", objectIdStr);
        }

        public async Task<UserModel> GetByEmail(string email)
        {
            return (await _dbClient.GetByAnyAsync<UserModel>("Users", "Email", email)).FirstOrDefault();
        }

        public async Task<UserModel> ThirdPartySignIn(UserModel user)
        {
            // Get the user if there's one matching the external id and type
            var registeredUser = (await _dbClient.GetByAnyAsync<UserModel>("Users", "ExternalId", user.ExternalId))
                .FirstOrDefault(u => u.ExternalType == user.ExternalType);

            // Register the user if there's none
            if (registeredUser == null)
            {
                return await Create(user);
            }
            // If user found, login and respond with jwt at the controller
            else
            {
                return registeredUser;
            }
        }
    }
}