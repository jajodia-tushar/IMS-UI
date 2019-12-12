using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Core
{

    public class SessionProvider
    {
        private SessionManager _SessionManager;
        public SessionProvider(SessionManager sessionManager){
            _SessionManager = sessionManager;
        }

        public SessionResponse getSession(){ /// Something Related To Session
            SessionResponse response = new SessionResponse();
            response.UserName = _SessionManager.GetString("username");  
            response.Role = _SessionManager.GetString("role");
            response.ShelfCode = _SessionManager.GetString("ShelfCode");
            return response;
        }

        public SessionResponse postShelfData(Shelf shelf)
        {
            _SessionManager.SetString("ShelfCode", shelf.Code);
            return this.getSession();
        }
    }
}
