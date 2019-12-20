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
    public class UserNameController : ControllerBase
    {
        private UserService _UserService;
        public UserNameController(UserService userService)
        {
            _UserService = userService;
        }
        // GET: api/UserName
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_UserService.getLoggedUser());
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }

        // GET: api/UserName/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserName
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/UserName/5
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
