using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
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
        private SessionManager sessionManager;
        public FrequentlyUsedItemController(FrequentlyUsedItemProvider frequentlyUsedItemProvider, SessionManager sessionManager)
        {
            this.frequentlyUsedItemProvider = frequentlyUsedItemProvider;
            this.sessionManager = sessionManager;
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