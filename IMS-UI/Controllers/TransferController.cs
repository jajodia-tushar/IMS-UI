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

        public TransferController(TransferProvider transferProvider)
        {
            this.transferProvider = transferProvider;
        }

        [HttpPatch]
        public async Task<Response> TransferToShelf(TransferToShelvesRequest request)
        {
            var response = await transferProvider.TransferToShelf(request);
            return response;
        }
    }
}