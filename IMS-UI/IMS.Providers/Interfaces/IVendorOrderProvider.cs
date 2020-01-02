using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IVendorOrderProvider
    {
        Task<VendorOrderResponse> postVendorOrder(VendorOrder vendorOrder);
        Task<VendorOrdersList> getAllVendorOrders(string toDate, string fromDate);
    }
}
