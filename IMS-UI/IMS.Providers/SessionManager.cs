using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class SessionManager
    {
        private IHttpContextAccessor _httpContextAccessor;
        
        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        

        public string GetString(string key)
        {
            return _httpContextAccessor.HttpContext.Session.GetString(key);
        } 

        public void SetString(string key,string value)
        {
            _httpContextAccessor.HttpContext.Session.SetString(key, value);
        }
    }
}
