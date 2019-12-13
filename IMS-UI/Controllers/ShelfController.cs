using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Core.Infra;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelfController : ControllerBase
    {
        private ShelfProvider _ShelfProvider;
        private SessionManager _sessionManager;
        public ShelfController(ShelfProvider shelfProvider, SessionManager sessionManager)
        {
            _ShelfProvider = shelfProvider;
            _sessionManager = sessionManager;
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

        // POST: api/Shelf
        [HttpPost]
        public IActionResult SetShelfCode([FromBody] Shelf shelf)
        {
            _sessionManager.SetObject("Shelf", shelf);
            return Ok(shelf);
        }

        [HttpGet("selected")]
        public IActionResult GetSelectedShelf()
        {
            var shelfResponse = new ShelfResponse { shelf = (Shelf)_sessionManager.GetObject<Shelf>("Shelf") };
            return Ok(shelfResponse);   
        }
    }
}
