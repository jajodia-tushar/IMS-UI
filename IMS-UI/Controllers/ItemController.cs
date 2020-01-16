using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IItemListProvider _ItemListProvider;
        private IItemProvider _ItemProvider;
        private SessionManager sessionManager;
        

        public ItemController(IItemListProvider provider,IItemProvider itemProvider,SessionManager sessionManager)
        {
            _ItemListProvider = provider;
            this.sessionManager = sessionManager;
            _ItemProvider = itemProvider;
        }
        // GET: api/Item
        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            try
            {
                var response = await _ItemListProvider.ApiGetCaller("/api/Item");
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllItems()
        //{
        //    try
        //    {
        //        var response = await _itemProvider.GetAllItems();
        //        if (response.Error != null && response.Error.ErrorCode == 401)
        //            sessionManager.ClearSession();

        //        return Ok(response);
        //    }
        //    catch
        //    {
        //        return StatusCode(500);
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] Item item)
        {
            try
            {
                var response = await _ItemProvider.AddItem(item);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> EditItemDetails([FromBody] Item item)
        {
            try
            {
                var response = await _ItemProvider.EditItem(item);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeactivateItem(int itemId, bool isHardDelete)
        {
            try
            {
                var response = await _ItemProvider.DeactivateItem(itemId, isHardDelete);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

    }
}
