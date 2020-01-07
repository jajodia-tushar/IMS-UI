using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public StockStatusController(StockProvider stockProvider)
        {
            this.stockProvider = stockProvider;
        }

        [HttpGet]
        public async Task<StockStatusResponse> Get(string pageNumber, string pageSize)
       {
            string itemName = null;
            var response = await stockProvider.GetStockStatus(pageNumber, pageSize, itemName);
            return response;
        }

        [HttpGet("/filtering")]
        public async Task<StockStatusResponse> GetAdminStockStatus(string pageNumber, string pageSize, string itemName)
        {
            var response = await stockProvider.GetStockStatus(pageNumber, pageSize, itemName);
            return response;
        }
    }
}