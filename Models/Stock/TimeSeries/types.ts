export interface IStockTimeSerie {
  symbol: string;
  date: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  kind: StockTimeSerieKindEnum;
}

export enum StockTimeSerieKindEnum {
  INTRADAY = "intraday",
}
