using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
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
        private SessionManager sessionManager;
        public RAGStatusController(RAGStatusProvider rAGStatusProvider,SessionManager sessionManager)
        {
            this.rAGStatusProvider = rAGStatusProvider;
            this.sessionManager = sessionManager;
        }


        public async Task<IActionResult> Get()
        {
            var response = await rAGStatusProvider.GetList();
            try
            {
                if (response.Error != null && response.Error.ErrorCode == 401)
                    sessionManager.ClearSession();

                return Ok(response);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}