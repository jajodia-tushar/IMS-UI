using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IStoreProvider
    {
        Task<StockStatusResponse> GetStoreStatus(string pageNumber, string pageSize);
        Task<Response> TransferToShelf(TransferToShelvesRequest request);
    }
}
