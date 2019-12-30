using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class VendorOrder
    {
        public Vendor Vendor { get; set; }
        public VendorOrderDetails VendorOrderDetails { get; set; }
    }
}
