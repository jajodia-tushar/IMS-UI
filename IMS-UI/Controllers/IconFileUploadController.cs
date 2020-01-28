using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Models.Shared;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IconFileUploadController : ControllerBase
    {
        private IConfiguration _iconfiguration;
        private IFileProvider _IFileProvider;
        public IconFileUploadController(IConfiguration configuration, IFileProvider fileProvider)
        {
            _iconfiguration = configuration;
            _IFileProvider = fileProvider;
        }
        
        [HttpPost]
        public IActionResult UploadFile([FromForm]FileInputModel fileInputModel)
        {
            try
            {
                if (fileInputModel.FileToUpload.Length > 0)
                {
                    string FileSavingPath = _iconfiguration["ItemIconPath"];
                    string locationUrl = _IFileProvider.UploadFile(fileInputModel.FileToUpload, FileSavingPath);
                    return Ok(new { LocationUrl = locationUrl });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }
    }
}