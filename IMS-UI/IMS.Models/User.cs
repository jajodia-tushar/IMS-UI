using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class User
    {
        [JsonProperty("UserName")]
        public string  UserName { get; set; }
        [JsonProperty("Password")]
        public string Password { get; set; }
    }

}
