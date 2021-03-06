using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface ILoginProvider
    {
        Task<LoginResponse> ApiCaller(Object requestData);
        Task<Response> LogOut();
        Task<Response> ChangePassword(int userId, ChangePasswordDetails changePasswordDetails);
    }
}
