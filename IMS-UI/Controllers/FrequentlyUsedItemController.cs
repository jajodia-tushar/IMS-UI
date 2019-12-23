using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FrequentlyUsedItemController : ControllerBase
    {

        private FrequentlyUsedItemProvider frequentlyUsedItemProvider;
        public FrequentlyUsedItemController(FrequentlyUsedItemProvider frequentlyUsedItemProvider)
        {
            this.frequentlyUsedItemProvider = frequentlyUsedItemProvider;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            string startDate,
            string endDate,
            string itemsCount
        )
        {
            var response = 
                await frequentlyUsedItemProvider.GetList(
                    startDate,
                    endDate,
                    itemsCount
                );
            try
            {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("No Item Found");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}