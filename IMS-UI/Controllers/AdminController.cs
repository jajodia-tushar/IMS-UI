using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
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
        private SessionManager sessionManager;

        public AdminController(IAdminListProvider provider, SessionManager sessionManager)
        {
            _AdminListProvider = provider;
            this.sessionManager = sessionManager;
        }
        // GET: api/Admin
        [HttpGet]
        public async Task<IActionResult> GetAllAdmins()
        {
            try
            {
                var response = await _AdminListProvider.ApiGetCaller("/api/User/Role/admin");
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
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
