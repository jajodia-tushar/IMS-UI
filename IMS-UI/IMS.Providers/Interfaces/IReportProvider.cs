using IMS.Contracts;
using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IReportProvider
    {
        Task<ItemsAvailabilityResponse> GetRAGSTatusReport(string locationName, string locationCode, string colour, string pageNumber, string pageSize);

        Task<FrequentlyUsedItem> GetFrequentlyUsedItemList(string fromDate, string toDate, string itemCount);

        Task<DateItemConsumptionResponse> GetItemWiseAnalysis(string startDate, string endDate);

        Task<ShelfWiseOrderCountResponse> GetShelfWiseData(string fromDate, string toDate);

        Task<RAGStatusResponse> GetRAGStatusList();
        Task<DateWiseItemsConsumption> GetItemConsumptionReports(string fromDate, string toDate);
        Task<ItemConsumptionDetailsResponse> GetItemConsumptionDetailReports(string fromDate, string toDate, string pageNumber, string pageSize);
    }
}
