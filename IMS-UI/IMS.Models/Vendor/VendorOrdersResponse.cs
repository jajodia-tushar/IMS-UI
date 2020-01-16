using IMS_UI.IMS.Models.Shared;
using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class VendorOrdersResponse : Response
    {
        public List<VendorOrder> VendorOrders { get; set; }
        public PagingInfo pagingInfo { get; set; }
    }
}
