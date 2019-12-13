using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class PlaceEmployeeOrderRequest
    {
        public Employee Employee { get; set; }
        public EmployeeOrder EmployeeOrder { get; set; }
    }
}
