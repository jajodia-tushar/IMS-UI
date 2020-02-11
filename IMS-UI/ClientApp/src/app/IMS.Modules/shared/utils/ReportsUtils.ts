import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


export class ReportsUtils{
        
    static DownloadReport(fileName : string,firstLevelData, innerLevelData?){  
            let excelFileName = fileName;
            let ws = XLSX.utils.json_to_sheet(firstLevelData);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Main Page");
            if(innerLevelData){
              innerLevelData.forEach(
                d => {
                  let dataToPlot = d.sheetData;
                  let nameOfSheet = d.sheetName.toString();
                  let innerSheet = XLSX.utils.json_to_sheet(dataToPlot);
                  XLSX.utils.book_append_sheet(wb, innerSheet, nameOfSheet);
                });
            }
            const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, excelFileName);
          }

       static saveAsExcelFile(buffer: any, fileName: string): void {
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
         }
}