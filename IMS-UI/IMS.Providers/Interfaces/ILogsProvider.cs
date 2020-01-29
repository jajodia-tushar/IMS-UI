using IMS_UI.IMS.Models.Logging;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface ILogsProvider
    {
        Task<LogsResponse> GetAllLogs();
        Task<ActivityLogsResponse> GetAllActivityLogs(string fromDate, string toDate, string pageNumber, string pageSize);
    }
}