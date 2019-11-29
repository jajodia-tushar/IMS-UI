using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public EmployeeValidationController()
        {
            employeeProvider = new EmployeeProvider();
        }
        [HttpGet("validate/{employeeId}")]
        public async Task<EmployeeResponse> GetEmployee(int employeeId)
        {
            var response = await employeeProvider.ValidateEmployee(employeeId);
            return response;
        }
    }
}

//        // GET: api/EmployeeValidation
//        [HttpGet]
//        public IEnumerable<string> Get()
//        {
//            return new string[] { "value1", "value2" };
//        }

//        // GET: api/EmployeeValidation/5
//        [HttpGet("{id}", Name = "Get")]
//        public string Get(int id)
//        {
//            return "value";
//        }

//        // POST: api/EmployeeValidation
//        [HttpPost]
//        public void Post([FromBody] string value)
//        {
//        }

//        // PUT: api/EmployeeValidation/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }

//        // DELETE: api/ApiWithActions/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//        }
//    }
//}
