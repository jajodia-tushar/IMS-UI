using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private IAdminListProvider _AdminListProvider;

        public AdminController(IAdminListProvider provider)
        {
            _AdminListProvider = provider;
        }
        // GET: api/Admin
        [HttpGet]
        public async Task<IActionResult> GetAllAdmins()
        {
            try
            {
                var response = await _AdminListProvider.ApiGetCaller("/api/User/Role/superadmin");
                if (response.Error == null)
                    return Ok(response);
                else
                    return StatusCode(500);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }

        }

        // GET: api/Admin/5
        //[HttpGet("{Role}", Name = "Get")]
       
            

        // POST: api/Admin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
