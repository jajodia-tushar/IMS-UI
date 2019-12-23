using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class FrequentlyUsedItem : Response
    {
       public List<ItemQuantityMapping> ItemQuantityMapping { get; set; }
    }
}
