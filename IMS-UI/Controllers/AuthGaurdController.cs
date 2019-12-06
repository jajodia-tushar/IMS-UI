using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthGaurdController : ControllerBase
    {
        private AuthGaurdService _AuthGaurdService;
        public AuthGaurdController(AuthGaurdService service)
        {
            _AuthGaurdService = service;
        }
        // GET: api/AuthGaurd
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_AuthGaurdService.ValidateUser());
            }
            catch(Exception e)
            {
                return StatusCode(500);
            }
            
        }

        // GET: api/AuthGaurd/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AuthGaurd
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/AuthGaurd/5
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
