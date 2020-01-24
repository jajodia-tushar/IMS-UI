using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class EmployeesResponse:Response
    {
        public List<Employee> Employees { get; set; }
        public PagingInfo PagingInfo { get; set; }

        public string filter { get; set; }

    }
}
