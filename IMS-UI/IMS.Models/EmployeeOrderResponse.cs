using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IMS_UI.IMS.Models
{
    public class EmployeeOrderResponse
    {
        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public Shelf Shelf { get; set; }
        public List<ItemQuantityMapping> EmployeeItemsQuantityList { get; set; }
    }
}
