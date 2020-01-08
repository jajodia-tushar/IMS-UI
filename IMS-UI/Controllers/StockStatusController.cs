using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("stockStatus")]
    [ApiController]
    public class StockStatusController : ControllerBase
    {
        StockProvider stockProvider;
        SessionManager sessionManager;
        public StockStatusController(StockProvider stockProvider,SessionManager sessionManager)
        {
            this.stockProvider = stockProvider;
            this.sessionManager = sessionManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string pageNumber, string pageSize)
       {
            try
            {
            string itemName = null;
            var response = await stockProvider.GetStockStatus(pageNumber, pageSize, itemName);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

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
            var response = await stockProvider.GetStockStatus(pageNumber, pageSize, itemName);
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