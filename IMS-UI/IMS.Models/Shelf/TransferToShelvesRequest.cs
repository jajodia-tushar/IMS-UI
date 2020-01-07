using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class TransferToShelvesRequest
    {
        public List<TransferToShelfRequest> ShelvesItemsQuantityList { get; set; }
    }
}
