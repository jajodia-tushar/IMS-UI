import { RAGDataModel } from "./RAGDataModel";

export class RAGStatusResponse{
    ragStatusList : RAGDataModel[];
    error : Error;
    status : string;
}