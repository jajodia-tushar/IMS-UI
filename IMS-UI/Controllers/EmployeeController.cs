using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : Controller
    {

        private IEmployeeProvider _employeeProviderProvider;
        private SessionManager sessionManager;

        public EmployeeController(IEmployeeProvider _employeeProviderProvider, SessionManager sessionManager)
        {
            this._employeeProviderProvider = _employeeProviderProvider;
            this.sessionManager = sessionManager;
                
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmoloyee()
        {
            try
            {
                var response = await _employeeProviderProvider.GetAllEmployee();
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