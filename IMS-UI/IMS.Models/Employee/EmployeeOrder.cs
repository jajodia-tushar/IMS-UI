using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrder
    {
        public Employee Employee { get; set; }
        public EmployeeOrderDetails EmployeeOrderDetails { get; set; }
    }
}
