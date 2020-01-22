using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class DateItemsMapping
    {
        public string Date { get; set; }
        public List<ItemQuantityMapping> ItemQuantityMappings { get; set; }
    }
}
