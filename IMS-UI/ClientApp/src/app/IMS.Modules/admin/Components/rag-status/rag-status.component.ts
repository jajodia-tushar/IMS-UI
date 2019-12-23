import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { Shelf } from "src/app/IMS.Models/Shelf/Shelf";
import { RAGDataModel } from "src/app/IMS.Models/RAGStatusDataModel";

@Component({
  selector: "app-rag-status",
  templateUrl: "./rag-status.component.html",
  styleUrls: ["./rag-status.component.css"]
})
export class RagStatusComponent implements OnInit {
  constructor() { }

  backgroundColor: string[] = ["#da2d2d", "#ff971d", "#c3f584"];

  @Input()
  ragData: RAGDataModel;

  generateRagChart(ragData: RAGDataModel) {
    new Chart(ragData.shelfName, {
      type: "doughnut",
      data: {
        labels: ragData.data.map(v => v.colour),
        datasets: [
          {
            borderWidth: 0,
            data: ragData.data.map(v => v.count),
            borderColor: "none",
            backgroundColor: this.backgroundColor,
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: true
        },

        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.generateRagChart(this.ragData);
  }
}
