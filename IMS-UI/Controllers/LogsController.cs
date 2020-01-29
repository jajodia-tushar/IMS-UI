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
    [ApiController]
    public class LogsController : ControllerBase
    {
        private ILogsProvider _logsProvider;
        public LogsController(ILogsProvider logsProvider)
        {
            _logsProvider = logsProvider;
        }

        [HttpGet("api/logs")]
        public async Task<LogsResponse> GetAllLogs()
        {
            var response = await _logsProvider.GetAllLogs();
            return response;
        }

        [HttpGet("api/ActivityLogs")]
        public async Task<ActivityLogsResponse> GetActivityLogs(string fromDate, string toDate, string pageNumber, string pageSize)
        {
            var response = await _logsProvider.GetAllActivityLogs(fromDate,toDate,pageNumber,pageSize);
            return response;
        }
    }
}