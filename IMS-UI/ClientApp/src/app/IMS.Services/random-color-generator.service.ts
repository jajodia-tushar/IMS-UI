import { Injectable } from "@angular/core";

@Injectable()
export class RandomColorGeneratorService {
  constructor() { }

  color: string[] = [
    "#42635f",
    "#2b6ae8",
    "#ebb326",
    "#6b5f7e",
    "#d97006",
    "#09eaf1",
    "#c28712",
    "#62f06b",
    "#da8b01",
    "#80a097",
    "#bc41b8",
    "#5b6cac",
    "#ea70c7",
    "#513499",
    "#9f3624",
    "#42124c",
    "#6eda00",
    "#838a0b",
    "#518f3f",
    "#d787b3",
    "#2c4f90",
    "#0fec4a",
    "#e96b9c",
    "#67d529",
    "#d9fd0e",
    "#091778",
    "#d47e67"
  ];

  getRandomColor(size: number): string[] {
    return this.color.slice(0, size);
  }
}
