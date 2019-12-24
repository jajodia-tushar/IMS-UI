using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IUserProvider
    {
        Task<UserResponse> AddUser(User user);
        Task<UserResponse> EditUser(User user);
        Task<UsersResponse> GetAllUsers();
    }
}
