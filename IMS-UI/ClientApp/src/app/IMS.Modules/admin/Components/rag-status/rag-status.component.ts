import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { Shelf } from "src/app/IMS.Models/Shelf/Shelf";
import { RAGDataModel } from "src/app/IMS.Models/Admin/RAGDataModel";
import { Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-rag-status",
  templateUrl: "./rag-status.component.html",
  styleUrls: ["./rag-status.component.css"]
})
export class RagStatusComponent implements OnInit {
  constructor(private router: Router) { }

  chart: Chart;
  backgroundColor: string[] = ["#da2d2d", "#ff971d", "#c3f584"];
  colourCodeMapping: string[] = ["Red", "Amber", "Green"];

  @Input()
  ragData: RAGDataModel;

  generateRagChart(ragData: RAGDataModel, router: Router) {
    this.chart = new Chart(ragData.name, {
      type: "doughnut",
      data: {
        labels: ragData.colourCountMappings.map(v => v.colour),
        datasets: [
          {
            borderWidth: 0,
            data: ragData.colourCountMappings.map(v => v.count),
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
        },
        onClick: (data, item: any) => {
          let index = item[0]._index;

          let selectedTab = 0;
          let colour = ragData.colourCountMappings[index].colour;
          let locationName = ragData.name;
          let locationCode = ragData.code;

          let queryParams = {
            locationCode, locationName, colour, selectedTab
          }
          router.navigate(['/Admin/Reports'], { queryParams });
        }
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.ragData != null) {
      this.generateRagChart(this.ragData, this.router);
    }

  }


}
