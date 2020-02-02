using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Providers.Interfaces;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelfController : ControllerBase
    {
        private IShelfProvider _shelfProvider;
        private SessionManager _sessionManager;
        public ShelfController(IShelfProvider shelfProvider, SessionManager sessionManager)
        {
            _shelfProvider = shelfProvider;
            _sessionManager = sessionManager;
        }
        // GET: api/Shelf
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _shelfProvider.ApiGetCaller("/api/Shelf");
            try {
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // GET: api/Shelf/A
        [HttpGet("{id}", Name = "GetShelf")]
        public async Task<IActionResult> GetShelfById(string id)
        {
            var response = await _shelfProvider.ApiGetCaller("/api/Shelf/" + id);
            try
            {
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }



        // PUT: api/Shelf/5
        [HttpPut]
        public async Task<IActionResult> EditShelfDetails([FromBody] Shelf shelf)
        {
            try
            {
                var response = await _shelfProvider.EditShelf(shelf);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{shelfId}")]
        public async Task<IActionResult> DeactivateItem(int shelfId)
        {
            try
            {
                var response = await _shelfProvider.DeactivateShelf(shelfId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("inventory/{shelfId}")]
        public async Task<IActionResult> GetShelfData(string shelfId)
        {
            try
            {
            var response = await _shelfProvider.GetShelfData(shelfId);
                if (response.Error != null && response.Error.ErrorCode == 401)
                    _sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
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
