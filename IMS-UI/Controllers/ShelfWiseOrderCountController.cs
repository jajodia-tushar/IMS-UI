using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelfWiseOrderCountController : ControllerBase
    {
        private ShelfWiseOrderCountProvider shelfWiseOrderCountProvider;
        private SessionManager sessionManager;

        public ShelfWiseOrderCountController(ShelfWiseOrderCountProvider shelfWiseOrderCountProvider, SessionManager sessionManager)
        {
            this.shelfWiseOrderCountProvider = shelfWiseOrderCountProvider;
            this.sessionManager = sessionManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderCount(
            string FromDate,
            string ToDate
        )
        {
            var response = 
                await shelfWiseOrderCountProvider.GetShelfWiseCount(
                    FromDate, 
                    ToDate
                );
            try
            {
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