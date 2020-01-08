using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IVendorOrderRejectProvider
    {
        Task<Response> Reject (int  OrderId);
       
    }
}
