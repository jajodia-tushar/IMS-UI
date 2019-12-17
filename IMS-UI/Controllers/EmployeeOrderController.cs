using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS_UI.IMS.Models;
using IMS_UI.IMS.Providers.Interfaces;

namespace IMS_UI.Controllers
{
    [Route("orders")]
    [ApiController]
    public class EmployeeOrderController : ControllerBase
    {
        private IOrderProvider _orderProvider;
        public EmployeeOrderController(IOrderProvider orderProvider)
        {
            _orderProvider = orderProvider;
        }


        [HttpPost]
        public async Task<EmployeeOrderResponse> PostOrder(EmployeeOrder placeEmployeeOrderRequest)
        {
            var response = await _orderProvider.PostOrders(placeEmployeeOrderRequest);
            return response;
        }
    }
}