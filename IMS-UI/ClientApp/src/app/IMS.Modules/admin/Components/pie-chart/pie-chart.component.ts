import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
import { FrequentlyUsedItemModel } from "src/app/IMS.Models/FrequentlyUsedItemModel";
import { RandomColorGeneratorService } from "src/app/IMS.Services/random-color-generator.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  constructor(
    private randomColorGeneratorService: RandomColorGeneratorService
  ) { }

  @Input()
  topItemConsumed: FrequentlyUsedItemModel;
  ngOnInit() { }

  onRefresh() {
    let element = document.getElementById("refreshPie");
    element.classList.toggle("fa-spin");
    setTimeout(() => {
      element.classList.remove("fa-spin");
      this.mostFrequentlyConsumedItems();

    }, 2000);

  }
  ngAfterViewInit() {
    this.mostFrequentlyConsumedItems();
  }

  private mostFrequentlyConsumedItems() {
    new Chart("pie-chart", {
      type: "pie",
      data: {
        labels: this.topItemConsumed.item.map(item => item.name),
        datasets: [
          {
            label: `Top ${this.topItemConsumed.item.length} items Consumed`,
            borderWidth: 0,
            borderColor: "#000",
            data: this.topItemConsumed.quantity,
            backgroundColor: this.randomColorGeneratorService.getRandomColor(
              this.topItemConsumed.item.length
            )
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
}
