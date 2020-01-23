using IMS_UI.IMS.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class EmployeeBulkOrdersResponse : Response
    {
        public List<EmployeeBulkOrder> EmployeeBulkOrders { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }
}
