using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class ListofVendorOrderDetails : Response
    {
        public List<VendorOrder> ListOfVendorOrders { get; set; }
    }
}
