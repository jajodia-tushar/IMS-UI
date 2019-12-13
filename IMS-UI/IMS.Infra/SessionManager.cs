using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Infra
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
            ISession session = _httpContextAccessor.HttpContext.Session;
            session.SetString(key, value);
           
        }

        public Object GetObject<Type>(string key)
        {
            ISession session = _httpContextAccessor.HttpContext.Session;
            string str = session.GetString(key);
            if (!string.IsNullOrEmpty(str))
                return JsonConvert.DeserializeObject<Type>(str);
            return null;
        }

        public void SetObject(string key, object value)
        {
            ISession session = _httpContextAccessor.HttpContext.Session;
            if (value == null)
                return;
            var str = JsonConvert.SerializeObject(value);
            session.SetString(key, str);
        }


    }
}
