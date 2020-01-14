using IMS_UI.IMS.Models;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrders
    {
        public Employee Employee { get; set; }
        public EmployeeOrderDetails EmployeeOrder { get; set; }
    }
}