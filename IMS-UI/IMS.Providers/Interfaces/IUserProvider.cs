using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IUserProvider
    {
        Task<UsersResponse> AddUser(User user);
        Task<UsersResponse> EditUser(User user);
        Task<UsersResponse> GetAllUsers();
        Task<Response> DeactivateUser(int userId, bool isHardDelete);
        Task<Response> IsUserNameUnique(string username);
        Task<Response> IsEmailNameUnique(string email);
        Task<UsersResponse> getAllAdmins();
    }
}
