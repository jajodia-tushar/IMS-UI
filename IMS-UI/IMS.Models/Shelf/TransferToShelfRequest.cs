using System.Collections.Generic;

namespace IMS_UI.IMS.Models
{
    public class TransferToShelfRequest
    {
        public Shelf Shelf { get; set; }
        public List<ItemQuantityMapping> ItemQuantityMapping { get; set; }
    }
}