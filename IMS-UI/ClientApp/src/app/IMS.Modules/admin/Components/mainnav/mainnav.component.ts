import { Component, OnInit } from "@angular/core";
import { Shelf } from "src/app/IMS.Models/Shelf/Shelf";
import { RAGDataModel } from "src/app/IMS.Models/RAGStatusDataModel";
import { RagStatusService } from "src/app/IMS.Services/admin/rag-status.service";

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
      this.ragDatas = this.ragStatusService.getRAGStatusData();

    }, 2000);
  }
  ngOnInit() {
    this.ragDatas = this.ragStatusService.getRAGStatusData();
  }
}



export class dataFromAPI { }
