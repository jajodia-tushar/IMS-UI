using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Vendor
{
    public class VendorResponse : Response
    {
        public List<Vendor> Vendors { get; set; }
    }
}
