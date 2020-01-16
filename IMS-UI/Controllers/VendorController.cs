using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private IVendorOrderProvider _VendorOrderProvider;
        private SessionManager _sessionManager;

        public VendorController(IVendorOrderProvider vendorOrderProvider, SessionManager sessionManger)
        {
            _VendorOrderProvider = vendorOrderProvider;
            _sessionManager = sessionManger;
        }
        // GET: api/Vendor
        [HttpGet]
        public async Task<IActionResult> GetAllVendors()
        {
            try
            {
                var response = await _VendorOrderProvider.GetAllVendors();
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }

        // GET: api/Vendor/5
        [HttpGet("orders")]
        public async Task<IActionResult> GetAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            var response = await _VendorOrderProvider.getAllVendorOrders(toDate,fromDate,approved,pageNumber,pageSize);
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

        [HttpGet("orders/{vendorId}")]
        public async Task<IActionResult> Get(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            var response = await _VendorOrderProvider.getParticularVendorOrder(vendorId,toDate, fromDate, approved, pageNumber, pageSize);
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


        // GET: api/Vendor/5
        [HttpGet("{id}", Name = "GetVendor")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Vendor
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VendorOrder vendorOrder)
        {
            try
            {
                var response = await _VendorOrderProvider.postVendorOrder(vendorOrder);
                return Ok(response);
            }
            catch(Exception e)
            {
                return StatusCode(500);
            }
        }

        // PUT: api/Vendor/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPut("orders")]
        public async Task<Response> Put([FromBody] VendorOrder vendorOrder)
        {
            var response = await _VendorOrderProvider.vendorOrderApproval(vendorOrder);
            return response;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("orders/{OrderId}")]

        public async Task<Response> DeleteVendorOrder(int OrderId)
        {
            var response = await _VendorOrderProvider.vendorOrderReject(OrderId);
            return response;
        }

    }
}
