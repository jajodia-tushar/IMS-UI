using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : Controller
    {

        private IEmployeeProvider _employeeProvider;
        private SessionManager sessionManager;

        public EmployeeController(IEmployeeProvider _employeeProviderProvider, SessionManager sessionManager)
        {
            this._employeeProvider = _employeeProviderProvider;
            this.sessionManager = sessionManager;
                
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmoloyee(string pageNumber, string pageSize)
        {
            try
            {
                var response = await _employeeProvider.GetAllEmployee(pageNumber,pageSize);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

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
                    sessionManager.ClearSession();

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
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeactivateUser(int id, bool isHardDelete)
        {
            try
            {
                var response = await _employeeProvider.DeactivateEmployee(id, isHardDelete);
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