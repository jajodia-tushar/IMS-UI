using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Models;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrder
    {
        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public Shelf Shelf { get; set; }
        public List<ItemQuantityMapping> EmployeeItemsQuantityList { get; set; }
    }
}
