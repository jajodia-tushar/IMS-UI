using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IPendingVendorOrdersProvider
    {
        Task<ListofVendorOrderDetails> GetVendorPendingApprovals(string pageNo, string pageSize);
    }
}
