using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
       
        // POST: api/Login
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] User user)
        {
            try
            {
                var provider = new LoginProvider();
                var response = await provider.ApiCaller(user, "/api/Login");
                if (response.token != null)
                    return Ok(response);
                else
                    return Unauthorized("invalid Credentials");
            }
            catch(Exception e)
            {
                return StatusCode(500);
            }
                     
        }

        // PUT: api/Login/5
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
