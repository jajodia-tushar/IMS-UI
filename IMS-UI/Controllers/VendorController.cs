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
    public class VendorController : ControllerBase
    {
        private VendorListProvider _VendorListProvider;

        public VendorController(VendorListProvider provider)
        {
            _VendorListProvider = provider;
        }
        // GET: api/Vendor
        [HttpGet]
        public async Task<IActionResult> GetAllVendors()
        {
            try
            {
                var response = await _VendorListProvider.ApiGetCaller("/api/vendor");
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

        // GET: api/Vendor/5
        [HttpGet("{id}", Name = "GetVendor")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Vendor
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Vendor/5
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
