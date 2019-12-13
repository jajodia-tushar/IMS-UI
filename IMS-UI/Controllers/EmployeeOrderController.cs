using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;

namespace IMS_UI.Controllers
{
    [Route("orders")]
    [ApiController]
    public class EmployeeOrderController : ControllerBase
    {
        OrderProvider orderProvider;
        public EmployeeOrderController(OrderProvider orderProvider)
        {
            this.orderProvider = orderProvider;
        }


        [HttpPost]
        public async Task<PlaceEmployeeOrderResponse> PostOrder(PlaceEmployeeOrderRequest placeEmployeeOrderRequest)
        {
            var response = await orderProvider.PostOrders(placeEmployeeOrderRequest);
            return response;
        }
    }
}