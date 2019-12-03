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

        public Boolean ValidateUser()
        {
            var userName = _SessionManager.GetString("username");
            if (userName != null)
                return true;
            else
                return false;
        }

    }
}
