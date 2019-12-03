using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Models;

namespace IMS_UI.Controllers
{
    [Route("emp")]
    [ApiController]
    public class EmployeeValidationController : ControllerBase
    {
        EmployeeProvider employeeProvider;
        public EmployeeValidationController(EmployeeProvider provider)
        {
            employeeProvider = provider;
        }
        [HttpGet("validate/{employeeId}")]
        public async Task<EmployeeResponse> GetEmployee(int employeeId)
        {
            var response = await employeeProvider.ValidateEmployee(employeeId);
            return response;
        }
    }
}