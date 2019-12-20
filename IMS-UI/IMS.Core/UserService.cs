using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Core
{
    
    public class UserService
    {
        private SessionManager _SessionManager;
        public UserService(SessionManager sessionManager)
        {
            _SessionManager = sessionManager;
        }

        public UserName getLoggedUser()
        {
            UserName userName = new UserName();
            userName.Username= _SessionManager.GetString("username");
            return userName;
        } 
    }
}
