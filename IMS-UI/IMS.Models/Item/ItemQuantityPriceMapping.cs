using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class ItemQuantityPriceMapping
    {
        public Item Item { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
    }
}
