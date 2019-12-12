using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrdersResponse : Response
    {
        public Employee Employee { get; set; }
        public List<EmployeeOrder> EmployeeOrders { get; set; }
    }
}
