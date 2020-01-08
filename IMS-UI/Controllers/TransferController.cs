using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Core.Infra;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private TransferProvider transferProvider;
        private SessionManager sessionManager;

        public TransferController(TransferProvider transferProvider,SessionManager sessionManager)
        {
            this.sessionManager = sessionManager;
            this.transferProvider = transferProvider;
        }

        [HttpPatch]
        public async Task<IActionResult> TransferToShelf(TransferToShelvesRequest request)
        {
            try
            {
            var response = await transferProvider.TransferToShelf(request);
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