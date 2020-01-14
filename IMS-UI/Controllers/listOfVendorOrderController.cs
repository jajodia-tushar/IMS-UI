//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using IMS_UI.IMS.Models.Admin;
//using IMS_UI.IMS.Models.Vendor;
//using IMS_UI.IMS.Providers;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace IMS_UI.Controllers
////{
////    [Route("api/listOfvendororderDetails")]
////    [ApiController]
////    public class listOfVendorOrderController : ControllerBase
////    {
////        VendorOrderListProvider _vendororderlistprovider;
////        public listOfVendorOrderController(VendorOrderListProvider vendorOrderListProvider)
////        {
////            _vendororderlistprovider = vendorOrderListProvider;
////        }
////        // GET: api/listOfVendorOrder
////        [HttpGet]
////        public async Task<ListofVendorOrderDetails> Get()
////        //{
////        //    var response = await this._vendororderlistprovider.getorderdetails();
////        //    return response;
////        }

////        // GET: api/listOfVendorOrder/5
////        [HttpGet("{id}", Name = "Get")]
////        public string Get(int id)
////        {
////            return "value";
////        }

////        // POST: api/listOfVendorOrder
////        [HttpPost]
////        public void Post([FromBody] string value)
////        {
////        }

////        // PUT: api/listOfVendorOrder/5
////        [HttpPut]
////        public void Put([FromBody] string value)
////        {

////        }

////        // DELETE: api/ApiWithActions/5
////        [HttpDelete("{id}")]
////        public void Delete(int id)
////        {
////        }
////    }
//}
