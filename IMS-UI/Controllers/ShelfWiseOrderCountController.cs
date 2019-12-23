using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public ShelfWiseOrderCountController(ShelfWiseOrderCountProvider shelfWiseOrderCountProvider)
        {
            this.shelfWiseOrderCountProvider = shelfWiseOrderCountProvider;
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
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("no floors to display");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}