using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrdersResponse : Response
    { 
        public List<EmployeeOrders> EmployeeRecentOrders { get; set; }
        public PagingInfo pagingInfo { get; set; }
    }
}
