using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public RecentEntriesController(RecentEntriesProvider recentEntriesProvider)
        {
            this._recentEntriesProvider = recentEntriesProvider;
        }

        [HttpGet]
        public async Task<EmployeeRecentOrderResponse> GetRecentEntries()
        {
            var response = await _recentEntriesProvider.GetRecentEntries();
            return response;
        }

    }
}