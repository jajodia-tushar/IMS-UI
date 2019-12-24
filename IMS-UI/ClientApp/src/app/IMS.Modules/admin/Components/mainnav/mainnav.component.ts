import { Component, OnInit } from "@angular/core";
import { Shelf } from "src/app/IMS.Models/Shelf/Shelf";
import { RagStatusService } from "src/app/IMS.Services/admin/rag-status.service";
import { RAGDataModel } from "src/app/IMS.Models/Admin/RAGDataModel";

@Component({
  selector: "app-mainnav",
  templateUrl: "./mainnav.component.html",
  styleUrls: ["./mainnav.component.css"]
})
export class MainnavComponent implements OnInit {
  constructor(private ragStatusService: RagStatusService) { }
  ragDatas: RAGDataModel[];

  onRefresh() {
    let element = document.getElementById("refresh");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");

      this.ragStatusService.getRAGStatusData().subscribe(data => {
        this.ragDatas = JSON.parse(JSON.stringify(data.ragStatusList));
      });
    }, 2000);
  }

  ngAfterViewInit() {
    this.ragStatusService.getRAGStatusData().subscribe(data => {
      this.ragDatas = JSON.parse(JSON.stringify(data.ragStatusList));
    });
  }


  ngOnInit() {

  }
}



export class dataFromAPI { }
