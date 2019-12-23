import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";
import { ShelfWiseOrderCountResponse } from "src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse";
@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  constructor(private randomColorGenerator: RandomColorGeneratorService) { }

  @Input()
  totalFloorWisedItem: ShelfWiseOrderCountResponse;
  backgroundColor: string[];
  dataset: any[] = [];

  ngOnInit() { }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalFloorWisedItem.currentValue != null) {

      this.backgroundColor = this.randomColorGenerator.getRandomColor(
        this.totalFloorWisedItem.dateWiseShelfOrderCount[0].shelfOrderCountMappings.length
      );
      this.itemsConsumedPerDayFloorWise();
    }
  }

  private itemsConsumedPerDayFloorWise() {
    new Chart("line-chart", {
      type: "line",
      data: {
        labels: this.totalFloorWisedItem.dateWiseShelfOrderCount.map((data, index, array) => {
          let date = new Date(data.date);
          if (array.length > 7)
            return `${date.getMonth() + 1}/${date.getDate()}`;
          else
            return date.toString().split(' ')[0];
        }),
        datasets: this.totalFloorWisedItem.dateWiseShelfOrderCount[0].shelfOrderCountMappings.map((data, index) => {
          return {
            label: data.shelfName,
            backgroundColor: this.backgroundColor[index],
            borderColor: this.backgroundColor[index],
            data: this.totalFloorWisedItem.dateWiseShelfOrderCount.map(shelfData => shelfData.shelfOrderCountMappings[index].totalNumberOfOrder),
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