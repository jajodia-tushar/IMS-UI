using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class StockStatusResponse : Response
    {
        public List<ItemStockStatus> StockStatusList { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }
}
