using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IMS_UI.IMS.Core;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace IMS_UI.Controllers
{
    [Route("api/reports")]
    [ApiController]
    public class ReportsController : ControllerBase
    {

        private ReportsProvider _reportsProvider;
        private SessionManager _sessionManager;

        public ReportsController(
            ReportsProvider reportsProvider, 
            SessionManager sessionManager
            )
        {
            _reportsProvider = reportsProvider;
            _sessionManager = sessionManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetRAGStatusReport(
            string locationName,
            string locationCode,
            string colour,
            string pageNumber,
            string pageSize
        )
        {
            var response =
                await _reportsProvider.GetRAGSTatusReport(
                    locationName, locationCode, colour, pageNumber, pageSize);
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

        // GET : api/reports/frequentlyuseditem
        [HttpGet("frequentlyuseditem")]
        public async Task<IActionResult> GetFrequentlyUsedItem(
            string startDate,
            string endDate,
            string itemsCount
        )
        {
            var response = await _reportsProvider.GetFrequentlyUsedItemList(
                    startDate,
                    endDate,
                    itemsCount
                );

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

        // GET : api/reports/itemwiseanalysis
        [HttpGet("itemwiseanalysis")]
        public async Task<IActionResult> GetItemWiseAnalysis(
            string startDate,
            string endDate
        )
        {
            var response =
                await _reportsProvider.GetItemWiseAnalysis(startDate, endDate);

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