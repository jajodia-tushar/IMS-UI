using System;
using System.Collections.Generic;
using System.IO;
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
    public class FileUploadController : ControllerBase
    {
        private IFileStorage _IFileStorage;
        public FileUploadController(IFileStorage fileStorage)
        {
            _IFileStorage = fileStorage;  
        }
        // GET: api/FileUpload
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/FileUpload/5
        [HttpGet("{id}", Name = "GetFile")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FileUpload
        [HttpPost]
        public IActionResult Post()
        {
            try
            {
                IFormFile file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    string locationUrl=_IFileStorage.UploadFile(file);
                    return Ok(new { LocationUrl = locationUrl });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return StatusCode(500);
            }


        }


        // PUT: api/FileUpload/5
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
