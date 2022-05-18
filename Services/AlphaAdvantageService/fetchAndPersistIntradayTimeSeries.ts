import { AlphaAdvantageApi } from "@api/lib/AlphaAdvantageApi";
import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@api/lib/dbConnect";

import StockIntradayTimeSeriesModel, {
  StockTimeSerieSchemaType,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import { FilterQuery } from "mongoose";

const { ALPHA_API_RETRY_TIMEOUT } = process.env;

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol, Region }: TStockMetadataModel,
  outputSize: "full" | "compact" = "full"
) {
  const extraObj: Partial<TStockTimeSeriesModel> = {
    Kind: StockTimeSerieKindEnum.INTRADAY,
    Symbol,
    Region,
  };

  let timeSeries: StockTimeSerieSchemaType[] | undefined;

  let timeOut = false;
  setTimeout(() => (timeOut = true), Number(ALPHA_API_RETRY_TIMEOUT ?? 0));

  while (!timeSeries && !timeOut) {
    const TimeSeries = await AlphaAdvantageApi.timeSeriesIntradayExtended(
      Symbol,
      outputSize
    ).then(({ TimeSeries }) => TimeSeries);

    if (!TimeSeries) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    timeSeries = Object.entries(TimeSeries).map(
      ([date, timeSerie]) =>
        Object.assign(timeSerie, {
          ...extraObj,
          Date: new Date(date),
        }) as TStockTimeSeriesModel
    );
  }

  return (await timeSeries)
    ? dbConnect()
        .then(() =>
          (timeSeries as StockTimeSerieSchemaType[]).map(
            (timeserie) =>
              StockIntradayTimeSeriesModel.findOneAndUpdate(
                {
                  ...extraObj,
                  Date: timeserie.Date,
                } as FilterQuery<TStockTimeSeriesModel>,
                timeserie,
                { upsert: true, setDefaultsOnInsert: true }
              ).exec() as Promise<TStockTimeSeriesModel>
          )
        )
        .then((promises) => Promise.all(promises))
    : timeSeries;
}

export default fetchAndPersistIntradayTimeSeries;
