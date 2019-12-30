using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Vendor;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/vendorOrderEdit")]
   
    public class VendorOrderEditController : ControllerBase
    {
        IVendorOrderApprovalProvider _VendorOrderApprovalProvider;

       public VendorOrderEditController(IVendorOrderApprovalProvider VendorOrderApprovalProvider)
        {
            this._VendorOrderApprovalProvider = VendorOrderApprovalProvider;
        }
        [HttpPut]
        public async Task<Response> Put([FromBody] VendorOrder vendorOrder )
        {
            var response = await _VendorOrderApprovalProvider.Approve(vendorOrder);
            return response;
        }
      
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
