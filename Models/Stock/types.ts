import { IStockMetaData } from "./MetaData/types";
import { IStockTimeSeries } from "./TimeSerie/types";

export interface IStock {
  MetaData: IStockMetaData;
  TimeSeries: Record<string, IStockTimeSeries>;
}
