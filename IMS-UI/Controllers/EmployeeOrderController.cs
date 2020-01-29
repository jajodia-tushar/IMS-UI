using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using IMS_UI.IMS.Core.Infra;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeOrderController : ControllerBase
    {
        private IEmployeeOrderProvider _employeeOrderProvider;
        private SessionManager _sessionManager;

        public EmployeeOrderController(IEmployeeOrderProvider orderProvider, SessionManager sessionManager)
        {
            _employeeOrderProvider = orderProvider;
            _sessionManager = sessionManager;
        }

       
        [HttpPost]
        public async Task<EmployeeOrderResponse> PostOrder(EmployeeOrder placeEmployeeOrderRequest)
        {
            var response = await _employeeOrderProvider.PostOrders(placeEmployeeOrderRequest);
            return response;
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> PostBulkOrder(EmployeeBulkOrder employeeBulkOrder)
            {
            try
            {
                var response = await _employeeOrderProvider.PostBulkOrder(employeeBulkOrder);
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