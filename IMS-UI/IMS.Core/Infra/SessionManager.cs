using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Core.Infra
{
    public class SessionManager
    {
        private IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void SetInt(string key, int value)
        {
            _session.SetInt32(key, value);
        }

        public int GetInt(string key)
        {
            var val = _session.GetInt32(key) != null ? _session.GetInt32(key) : Convert.ToInt32(_httpContextAccessor.HttpContext.Request.Cookies[key]);

            return (int)val;
        }

        public string GetString(string key)
        {
            return _session.GetString(key);
        } 

        public void SetString(string key,string value)
        {
            if (value == null || key == null)
                return;
            _session.SetString(key, value);
           
        }

        public Object GetObject<Type>(string key)
        {
            string str = _session.GetString(key);
            if (!string.IsNullOrEmpty(str))
                return JsonConvert.DeserializeObject<Type>(str);
            return null;
        }

        public void SetObject(string key, object value)
        {
            if (value == null)
                return;
            var str = JsonConvert.SerializeObject(value);
            _session.SetString(key, str);
        }


    }
}
