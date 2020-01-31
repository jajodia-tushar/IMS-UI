using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : Controller
    {

        private IEmployeeProvider _employeeProvider;
        private SessionManager _sessionManager;

        public EmployeeController(IEmployeeProvider employeeProvider, SessionManager sessionManager)
        {
            this._employeeProvider = employeeProvider;
            this._sessionManager = sessionManager;
                
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmoloyee(string filter ,string pageNumber, string pageSize)
        {
            try
            {
                var response = await _employeeProvider.GetAllEmployee(filter,pageNumber,pageSize);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("IdExists")]
        public async Task<IActionResult> IsUniqueEmployeeId(string employeeId)
        {
            try
            {
                var response = await _employeeProvider.IsUniqueEmployeeId(employeeId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpGet("email")]
        public async Task<IActionResult> IsUniqueEmployeeEmail(string email)
        {
            try
            {
                var response = await _employeeProvider.IsUniqueEmployeeEmail(email);
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
        public async Task<IActionResult> AddEmployeeDetails([FromBody] Employee employee)
        {
            try
            {
                var response = await _employeeProvider.AddEmployee(employee);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditEmployeeDetails([FromBody] Employee employee)
        {
            try
            {
                var response = await _employeeProvider.EditEmployee(employee);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeactivateUser(string id, bool isHardDelete)
        {
            try
            {
                var response = await _employeeProvider.DeactivateEmployee(id, isHardDelete);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("validate/{employeeId}")]
        public async Task<IActionResult> GetEmployee(string employeeId)
        {
            try
            {
                var response = await _employeeProvider.ValidateEmployee(employeeId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetEmployeeOrders(string toDate, string fromDate, string pageNumber, string pageSize, string employeeId)
        {
            try
            {
                var response = await _employeeProvider.GetEmployeeOrders(toDate, fromDate, pageNumber, pageSize, employeeId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost("orders")]
        public async Task<IActionResult> PostOrder(EmployeeOrder placeEmployeeOrderRequest)
        {
            try
            {
                var response = await _employeeProvider.PostOrders(placeEmployeeOrderRequest);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> PostBulkOrder(EmployeeBulkOrder employeeBulkOrder)
        {
            try
            {
                var response = await _employeeProvider.PostBulkOrder(employeeBulkOrder);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("EmployeeBulkOrders/{orderId}")]
        public async Task<EmployeeBulkOrdersResponse> GetEmployeeBulkOrderById(int orderId)
        {
            var response = await _employeeProvider.GetEmployeeBulkOrderById(orderId);
            return response;

            //try catch
        }

        [HttpPut("EmployeeBulkOrders/Cancel/{orderId}")]
        public async Task<Response> CancelEmployeeBulkOrder(int orderId)
        {
            var response = await _employeeProvider.CancelEmployeeBulkOrder(orderId);
            return response;
        }

        [HttpPut("EmployeeBulkOrders/Reject/{orderId}")]
        public async Task<Response> RejectEmployeeBulkOrder(int orderId)
        {
            var response = await _employeeProvider.RejectEmployeeBulkOrder(orderId);
            return response;
        }

        [HttpPut("EmployeeBulkOrders/Approve/{orderId}")]
        public async Task<ApproveBulkOrderResponse> ApproveEmployeeBulkOrder(int orderid, [FromBody] ApproveEmployeeBulkOrder approveEmployeeBulkOrder)
        {


            var response = await _employeeProvider.ApproveEmployeeBulkOrder(orderid, approveEmployeeBulkOrder);
            return response;

        }
        [HttpGet("GetStockStatus")]
        public async Task<StockStatusResponse> GetStockStatus(int pageNumber, int pageSize, string itemIds)
        {
            var response = await _employeeProvider.GetStockStatus(pageNumber, pageSize, itemIds);
            return response;
        }

        [HttpPut("EmployeeBulkOrders/return/{orderId}")]
        public async Task<EmployeeBulkOrdersResponse> ReturnBulkOrderById(int orderId, [FromBody] EmployeeBulkOrder employeeBulkOrder)
        {
            var response = await _employeeProvider.ReturnBulkOrderById(orderId, employeeBulkOrder);
            return response;
        }

    }
}