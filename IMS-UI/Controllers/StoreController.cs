using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        public IStoreProvider _storeProvider;
        public SessionManager _sessionManager;

        public StoreController(IStoreProvider storeProvider, SessionManager sessionManager)
        {
            _storeProvider = storeProvider;
            _sessionManager = sessionManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string pageNumber, string pageSize)
        {
            try
            {
                string itemName = null;
                var response = await _storeProvider.GetStoreStatus(pageNumber, pageSize, itemName);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("/filtering")]
        public async Task<IActionResult> GetAdminStockStatus(string pageNumber, string pageSize, string itemName)
        {
            try
            {
                var response = await _storeProvider.GetStoreStatus(pageNumber, pageSize, itemName);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> TransferToShelf(TransferToShelvesRequest request)
        {
            try
            {
                var response = await _storeProvider.TransferToShelf(request);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}