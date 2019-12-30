using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class AdminListResponse:Response
    {
        public List<User> Users { get; set; }
    }
}
