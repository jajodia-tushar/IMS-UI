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
        private IVendorProvider _vendorProvider;
        private SessionManager _sessionManager;

        public VendorController(IVendorProvider vendorOrderProvider, SessionManager sessionManger)
        {
            _vendorProvider = vendorOrderProvider;
            _sessionManager = sessionManger;
        }
        // GET: api/Vendor
        [HttpGet]
        public async Task<IActionResult> GetAllVendors(string name,string pageNumber,string pagesize)
        {
            try
            {
                var response = await _vendorProvider.GetAllVendors(name,pageNumber, pagesize);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }
        
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Vendor vendor)
        {
            try
            {
                var response = await _vendorProvider.AddVendor(vendor);
                if(response.Error != null && response.Error.ErrorCode==401 )
                    _sessionManager.ClearSession();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] Vendor vendor)
        {
            try
            {
                var response = await _vendorProvider.EditVendor(vendor);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{vendorId}")]
        public async Task<IActionResult> DeactivateVendor(int vendorId, bool isHardDelete)
        {
            try
            {
                var response = await _vendorProvider.DeactivateVendor(vendorId, isHardDelete);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("IsUnique")]
        public async Task<IActionResult> CheckUniqueness(string name, string mobile, string pan, string gst, string cin)
        {
            try
            {
                var response = await _vendorProvider.IsVendorDetailUnique(name, mobile, pan, gst,cin);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // GET: api/Vendor/orders
        [HttpGet("orders")]
        public async Task<IActionResult> GetAllVendorOrders(string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            var response = await _vendorProvider.GetAllVendorOrders(toDate,fromDate,approved,pageNumber,pageSize);
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

        // POST: api/Vendor/orders
        [HttpPost("orders")]
        public async Task<IActionResult> Post([FromBody] VendorOrder vendorOrder)
        {
            try
            {
                var response = await _vendorProvider.PostVendorOrder(vendorOrder);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // GET: api/Vendor/orders/5
        [HttpGet("orders/{vendorId}")]
        public async Task<IActionResult> GetParticularVendorOrder(string vendorId, string toDate, string fromDate, string approved, string pageNumber, string pageSize)
        {
            try
            {
                var response = await _vendorProvider.GetParticularVendorOrder(vendorId, toDate, fromDate, approved, pageNumber, pageSize);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
   
        // PUT api/Vendor/orders
        [HttpPut("orders")]
        public async Task<IActionResult> Put([FromBody] VendorOrder vendorOrder)
        {
            try
            {
            var response = await _vendorProvider.VendorOrderApproval(vendorOrder);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // DELETE: api/Vendor/orders/6
        [HttpDelete("orders/{OrderId}")]

        public async Task<IActionResult> DeleteVendorOrder(int OrderId)
        {
            try
            {
            var response = await _vendorProvider.VendorOrderReject(OrderId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // GET: api/Vendor/order/5
        [HttpGet("order/{OrderId}")]
        public async Task<IActionResult> GetVendorOrderByOrdeId(int OrderId)
        {
            try
            {
                var response = await _vendorProvider.GetVendorOrderByOrderId(OrderId);
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
