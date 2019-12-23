import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ShelfWiseAnalysisModel } from "src/app/IMS.Models/Shelf/ShelfWiseAnalysisModel";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService) { }

  @Input()
  totalFloorWisedItem: ShelfWiseAnalysisModel;

  backgroundColor: string[];
  dataset: any[] = [];
  isRefresh: boolean = true;
  value: string = "fa fa-refresh";

  ngOnInit() { }

  onRefresh() {
    let element = document.getElementById("refreshLine");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");
      this.itemsConsumedPerDayFloorWise();

    }, 2000);

  }



  ngAfterViewInit() {
    this.backgroundColor = this.randomColorGenerator.getRandomColor(
      this.totalFloorWisedItem.floors.length
    );
    this.itemsConsumedPerDayFloorWise();
  }

  private itemsConsumedPerDayFloorWise() {
    new Chart("line-chart", {
      type: "line",
      data: {
        labels: this.totalFloorWisedItem.date,
        datasets: this.totalFloorWisedItem.floors.map((floor, index) => {
          return {
            label: floor.name,
            backgroundColor: this.backgroundColor[index],
            borderColor: this.backgroundColor[index],
            data: floor.quantity,
            fill: false
          };
        })
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }
}
