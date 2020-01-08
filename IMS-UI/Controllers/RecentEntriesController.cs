using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("recentEntry")]
    [ApiController]
    public class RecentEntriesController : ControllerBase
    {
        RecentEntriesProvider _recentEntriesProvider;
        SessionManager sessionManager;

        public RecentEntriesController(RecentEntriesProvider recentEntriesProvider,
            SessionManager sessionManager)
        {
            this._recentEntriesProvider = recentEntriesProvider;
            this.sessionManager = sessionManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecentEntries()
        {
            try
            {
            var response = await _recentEntriesProvider.GetRecentEntries();
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