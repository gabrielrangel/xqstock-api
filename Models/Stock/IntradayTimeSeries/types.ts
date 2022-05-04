export interface IStockIntradayTimeSerie {
  symbol: string;

  timeSeries: [
    {
      date: Date;
      open: string;
      high: string;
      low: string;
      close: string;
      volume: string;
    }
  ];
}
