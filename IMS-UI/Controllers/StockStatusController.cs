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
        public async Task<StockStatusResponse> GetAdminStockStatus()
        {
            var response = await stockProvider.GetStockStatus();
            return response;
        }
    }
}