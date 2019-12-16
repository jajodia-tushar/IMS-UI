using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;

namespace IMS_UI.Controllers
{
    [Route("employee")]
    [ApiController]
    public class EmployeeValidationController : ControllerBase
    {
        private IEmployeeProvider _employeeProvider;
        public EmployeeValidationController(IEmployeeProvider employeeProvider)
        {
            this._employeeProvider = employeeProvider;
        }

        [HttpGet("validate/{employeeId}")]
        public async Task<EmployeeResponse> GetEmployee(string employeeId)
        {
            var response = await _employeeProvider.ValidateEmployee(employeeId);
            return response;
        }


    }
}