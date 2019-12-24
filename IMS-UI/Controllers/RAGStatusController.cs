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
    public class RAGStatusController : ControllerBase
    {
        private RAGStatusProvider rAGStatusProvider;
        public RAGStatusController(RAGStatusProvider rAGStatusProvider)
        {
            this.rAGStatusProvider = rAGStatusProvider;
        }


        public async Task<IActionResult> Get()
        {
            var response = await rAGStatusProvider.GetList();
            try
            {
                if (response.Error == null)
                    return Ok(response);
                else
                    return NotFound("No RAG Status Found");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}