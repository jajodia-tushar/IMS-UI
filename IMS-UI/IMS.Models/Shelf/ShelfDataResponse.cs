using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class ShelfDataResponse : Response
    {
        public Shelf shelf { get; set; }
        public List<ItemQuantityMapping> itemQuantityMappings { get; set; }
        public string status { get; set; }
        public string error { get; set; }
    }
}
