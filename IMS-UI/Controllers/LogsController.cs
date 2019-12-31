using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Models.Logging;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private ILogsProvider _logsProvider;
        public LogsController(ILogsProvider logsProvider)
        {
            _logsProvider = logsProvider;
        }

        [HttpGet]
        public async Task<LogsResponse> GetAllLogs()
        {
            var response = await _logsProvider.GetAllLogs();
            return response;
        }
    }
}