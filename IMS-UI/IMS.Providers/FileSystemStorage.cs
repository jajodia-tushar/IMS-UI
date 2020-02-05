using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers
{
    public class FileSystemStorage : IFileStorage
    {
        public string UploadFile(IFormFile file)
        {
            try
            {
                int count = 1;
                var folderName = Path.Combine("Resources", "ChallanImages");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                string fileNameOnly = Path.GetFileNameWithoutExtension(fullPath);
                string path = Path.GetDirectoryName(fullPath);
                string extension = Path.GetExtension(fullPath);
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }
                while (File.Exists(fullPath))
                {
                    string tempFileName = string.Format("{0}({1})", fileNameOnly, count++);
                    fullPath = Path.Combine(path, tempFileName + extension);
                    fileName = Path.GetFileName(fullPath);
                }
                var dbPath = Path.Combine(folderName, fileName);

                using (FileStream stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return dbPath ;
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
