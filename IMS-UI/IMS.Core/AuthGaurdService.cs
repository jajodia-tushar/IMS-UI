using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Core
{

    public class AuthGaurdService
    {
        private SessionManager _SessionManager;
        public AuthGaurdService(SessionManager sessionManager)
        {
            _SessionManager = sessionManager;
        }

        public AuthGaurdResponse ValidateUser()
        {
            AuthGaurdResponse response = new AuthGaurdResponse();
            response.UserName = _SessionManager.GetString("username");
            

         
                
            response.Role = _SessionManager.GetString("role");
            return response;
        }

    }
}
