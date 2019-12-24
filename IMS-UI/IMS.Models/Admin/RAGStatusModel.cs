using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class RAGStatusModel
    {
        public string name { get; set; }
        public string code { get; set; }
        public List<ColourCount> colourCountMappings { get; set; }
        
    }
}
