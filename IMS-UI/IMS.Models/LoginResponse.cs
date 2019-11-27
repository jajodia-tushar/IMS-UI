using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class LoginResponse:Response
    {
        public string AccessToken { get; set; }
        public User User { get; set; }
    }
}
