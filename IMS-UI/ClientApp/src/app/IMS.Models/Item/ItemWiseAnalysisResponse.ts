import { Error } from "../Error";

export class ItemWiseAnalysisModel {
  date: string;
  itemsConsumptionCount: number;
}

export class ItemWiseAnalysisResponse {

  itemConsumptions: ItemWiseAnalysisModel[];
  error: Error;
  status: string;
}
