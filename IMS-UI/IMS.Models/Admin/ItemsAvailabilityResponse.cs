using IMS_UI.IMS.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class ItemsAvailabilityResponse : Response
    {
        public List<ItemQuantityMapping> ItemQuantityMappings;
        public PagingInfo pagingInfo { get; set; }
    }
}
