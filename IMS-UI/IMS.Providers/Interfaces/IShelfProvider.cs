using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IShelfProvider
    {
        Task<ShelfDataResponse> GetShelfData(string shelfId);

        Task<ShelfListResponse> ApiGetCaller(string path);
        Task<ShelfListResponse> EditShelf(Shelf shelf);
        Task<ShelfListResponse> DeactivateShelf(int shelfId);
    }
}
