using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IReportProvider
    {
        Task<FrequentlyUsedItem> GetFrequentlyUsedItemList(string fromDate, string toDate, string itemCount);

        Task<DateItemConsumptionResponse> GetItemWiseAnalysis(string startDate, string endDate);
    }
}
