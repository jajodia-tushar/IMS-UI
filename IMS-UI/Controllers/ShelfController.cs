using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelfController : ControllerBase
    {
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
            try {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("no floors to display");
            }
            catch (Exception){
                return StatusCode(500);
            }
        }

        // GET: api/Shelf/A
        [HttpGet("{id}", Name = "GetShelf")]
        public async Task<IActionResult> GetShelfById(string id)
        {
            var response = await _ShelfProvider.ApiGetCaller("/api/Shelf/"+id);
            try
            {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("no floors to display");
            }
            catch (Exception){
                return StatusCode(500);
            }
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

        [HttpGet("inventory/{shelfId}")]
        public async Task<ShelfDataResponse> GetShelfData(string shelfId)
        {
            var response = await _ShelfProvider.GetShelfData(shelfId);
            return response;
        }
    }
}
