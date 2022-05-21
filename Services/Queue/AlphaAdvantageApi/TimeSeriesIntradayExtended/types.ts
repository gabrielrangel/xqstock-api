import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

export interface IOptions {
  metadata: TStockMetadataModel;
  endDate: Date;
  startDate?: Date;
}

export default IOptions;
