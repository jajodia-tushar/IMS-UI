using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Models;

namespace IMS_UI.Controllers
{
    [Route("employee")]
    [ApiController]
    public class EmployeeValidationController : ControllerBase
    {
        EmployeeProvider employeeProvider;
        public EmployeeValidationController(EmployeeProvider employeeProvider)
        {
            this.employeeProvider = employeeProvider;
        }

        [HttpGet("validate/{employeeId}")]
        public async Task<EmployeeResponse> GetEmployee(string employeeId)
        {
            var response = await employeeProvider.ValidateEmployee(employeeId);
            return response;
        }


    }
}