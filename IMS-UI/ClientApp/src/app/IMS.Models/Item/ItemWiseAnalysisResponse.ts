export class ItemWiseAnalysisModel {
  Date: string;
  ItemsConsumptionCount: number;
}

export class ItemWiseAnalysisResponse {
  getDateItemConsumptions : ItemWiseAnalysisModel[];
  error : Error;
  status : string;
}
