using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class VendorOrderResponse : Response
    {
        public VendorOrder VendorOrder { get; set; }
        public bool CanEdit { get; set; }
        public string LastModifiedBy { get; set; }
    }
}
