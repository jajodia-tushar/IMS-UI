import { Component, OnInit } from "@angular/core";
import { Shelf } from "src/app/IMS.Models/Shelf/Shelf";
import { RAGDataModel } from "src/app/IMS.Models/Admin/RAGDataModel";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";

@Component({
  selector: "app-mainnav",
  templateUrl: "./mainnav.component.html",
  styleUrls: ["./mainnav.component.css"]
})
export class MainnavComponent implements OnInit {
  constructor(private reportsService: ReportsService) { }
  ragDatas: RAGDataModel[];

  onRefresh() {
    let element = document.getElementById("refresh");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");

      this.reportsService.getRAGStatusData().subscribe(data => {
        this.ragDatas = JSON.parse(JSON.stringify(data.ragStatusList));
      });
    }, 2000);
  }

  ngAfterViewInit() {
    this.reportsService.getRAGStatusData().subscribe(data => {
      this.ragDatas = JSON.parse(JSON.stringify(data.ragStatusList));
    });
  }


  ngOnInit() {

  }
}



export class dataFromAPI { }
