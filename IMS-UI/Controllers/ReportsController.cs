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
    public class ReportsController : ControllerBase
    {

        private ReportsProvider _reportsProvider;
        private SessionManager _sessionManager;

        public ReportsController(ReportsProvider reportsProvider, SessionManager sessionManager)
        {
            this._reportsProvider = reportsProvider;
            this._sessionManager = sessionManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetRAGStatusReport(
            string locationName,
            string locationCode,
            string colour
        )
        {
            var response =
                await _reportsProvider.GetRAGSTatusReport(
                    locationName, locationCode, colour);
            try
            {
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}