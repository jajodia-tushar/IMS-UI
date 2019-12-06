using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelfController : ControllerBase
    {
        
        private SessionManager _SessionManager;
        private ShelfProvider _ShelfProvider;
        public ShelfController(ShelfProvider shelfProvider)
        {
            _ShelfProvider = shelfProvider;
        }
        // GET: api/Shelf
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response =await _ShelfProvider.ApiGetCaller("/api/Shelf");
            try
            {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("no floors to display");
            }
            
            catch(Exception e)
            {
                return StatusCode(500);
            }

        }

        // GET: api/Shelf/5
        [HttpGet("{id}", Name = "GetShelf")]
        public string GetShelfById(int id)
        {
            return "value";
        }

        // POST: api/Shelf
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Shelf/5
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
