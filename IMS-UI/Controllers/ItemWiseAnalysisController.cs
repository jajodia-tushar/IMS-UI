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
    [Route("api/[controller]")]
    [ApiController]
    public class ItemWiseAnalysisController : ControllerBase
    {
        private ItemWiseAnalysisProvider itemWiseAnalysisProvider;
        
        public ItemWiseAnalysisController(ItemWiseAnalysisProvider itemWiseAnalysisProvider)
        {
            this.itemWiseAnalysisProvider = itemWiseAnalysisProvider;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            string fromDate,
            string toDate
        )
        {
            var response =
                await itemWiseAnalysisProvider.GetItemWiseAnalysis(fromDate, toDate);

            try
            {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("No Items Found");
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }
    }
}