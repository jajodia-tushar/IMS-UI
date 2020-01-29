using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IVendorProvider
    {
        Task<VendorOrderResponse> PostVendorOrder(VendorOrder vendorOrder);
        Task<VendorOrdersResponse> GetAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize);
        Task<VendorOrdersResponse> GetParticularVendorOrder(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize);
        Task<Response> VendorOrderApproval(VendorOrder vendorOrder);
        Task<Response> VendorOrderReject(int orderId);

        Task<VendorResponse> GetAllVendors(string name,string pageNumber, string pagesize);
        Task<VendorOrderResponse> GetVendorOrderByOrderId(int OrderId);

        Task<VendorResponse> AddVendor(Vendor vendor);
        Task<VendorResponse> EditVendor(Vendor vendor);
        Task<Response> DeactivateVendor(int vendorId, bool isHardDelete);

        Task<Response> IsVendorDetailUnique(string vendorName, string phoneNumber, string pan, string gst, string cin);


    }
}
