using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class ItemStockStatus
    {
        public Item Item { get; set; }
        public List<StockStatus> StoreStatus { get; set; }
    }
}
