using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IVendorOrderApprovalProvider
    {
        Task<Response> Approve(VendorOrder vendorOrder);
    }
}
