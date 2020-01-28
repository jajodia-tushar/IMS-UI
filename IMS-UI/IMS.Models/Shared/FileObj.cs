using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Shared
{
    public class FileInputModel
    {
        public IFormFile FileToUpload { get; set; }
    }
}
