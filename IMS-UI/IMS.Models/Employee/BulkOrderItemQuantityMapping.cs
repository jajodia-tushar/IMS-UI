namespace IMS_UI.IMS.Models
{
    public class BulkOrderItemQuantityMapping
    {
        public Item Item { get; set; }
        public int QuantityOrdered { get; set; }
        public int QuantityUsed { get; set; }
    }
}