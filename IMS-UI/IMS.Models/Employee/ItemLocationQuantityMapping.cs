using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class ItemLocationQuantityMapping
    {
          public Item Item { get; set; }
        public List<LocationQuantityMapping> LocationQuantityMappings { get; set; }
    }
}
