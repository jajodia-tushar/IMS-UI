using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class VendorOrdersList : Response
    {
        public List<VendorOrder> ListOfVendorOrders { get; set; }
    }
}
