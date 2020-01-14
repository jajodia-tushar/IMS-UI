using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IItemProvider
    {
        Task<ItemResponse> AddItem(Item user);
        Task<ItemResponse> EditItem(Item user);
        Task<ItemsResponse> GetAllItems();
        Task<Response> DeactivateItem(int itemId,Boolean isHardDelete);
    }
}