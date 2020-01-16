using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IVendorOrderProvider
    {
        Task<VendorOrderResponse> postVendorOrder(VendorOrder vendorOrder);
        Task<VendorOrdersList> getAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize);
        Task<VendorOrdersList> getParticularVendorOrder(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize);
        Task<Response> vendorOrderApproval(VendorOrder vendorOrder);
        Task<Response> vendorOrderReject(int orderId);

        Task<VendorResponse> GetAllVendors();
    }
}
