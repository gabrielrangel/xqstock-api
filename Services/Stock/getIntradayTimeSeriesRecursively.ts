import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import AlphaAdvantageApi, {
  IMetadataSymbolSearch,
} from "@lib/AlphaAdvantageApi";
import StockIntradayTimeSeriesModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";
import dbConnect from "@lib/dbConnect";
import { QueryWithHelpers, FilterQuery } from "mongoose";

export default async function getIntradayTimeSeriesRecursively(
  { Symbol }: Partial<IMetadataSymbolSearch>,
  filter: FilterQuery<IStockTimeSerie> = {}
): Promise<QueryWithHelpers<IStockTimeSerie[], IStockTimeSerie>> {
  await dbConnect();

  Object.assign(filter, { Symbol, Kind: StockTimeSerieKindEnum.INTRADAY });

  const StockIntradayTimeSeries = await StockIntradayTimeSeriesModel.find(
    filter
  ).exec();

  if (StockIntradayTimeSeries.length) {
    return StockIntradayTimeSeries;
  }

  const TimeSeries = await AlphaAdvantageApi.timeSeriesIntradayExtended(
    Symbol,
    "full"
  ).then(({ TimeSeries: data }) =>
    Object.entries(data).map(([Date, dataObj]) =>
      Object.assign(dataObj, {
        Date,
        Symbol,
        Kind: StockTimeSerieKindEnum.INTRADAY,
      })
    )
  );

  await Promise.all(
    TimeSeries.map((timeserie) =>
      StockIntradayTimeSeriesModel.create(timeserie)
    )
  );

  return StockIntradayTimeSeriesModel.find(filter);
}
