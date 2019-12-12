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
            response.user = (User)_SessionManager.GetObject<User>("user");  
            response.shelfCode = _SessionManager.GetString("shelfCode");
            return response;
        }

        public SessionResponse postShelfData(Shelf shelf)
        {
            _SessionManager.SetString("shelfCode", shelf.Code);
            return this.getSession();
        }
    }
}
