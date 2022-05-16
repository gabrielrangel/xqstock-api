import { AlphaAdvantageApi } from "@api/lib/AlphaAdvantageApi";
import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@api/lib/dbConnect";

import StockIntradayTimeSeriesModel, {
  StockTimeSerieSchemaType,
} from "@api/Models/Stock/TimeSeries";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

const { ALPHA_API_RETRY_TIMEOUT } = process.env;

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol, Region }: TStockMetadataModel,
  outputSize: "full" | "compact" = "full"
) {
  const extraObj = { Kind: StockTimeSerieKindEnum.INTRADAY, Symbol, Region };

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

    timeSeries = Object.entries(TimeSeries).map(([date, timeSerie]) =>
      Object.assign(timeSerie, {
        ...extraObj,
        Date: new Date(date),
      })
    );
  }

  if (!timeSeries) {
    return;
  }

  await dbConnect()
    .then(() =>
      (timeSeries as StockTimeSerieSchemaType[]).map((timeserie) =>
        StockIntradayTimeSeriesModel.findOneAndUpdate(
          { ...extraObj, Date: timeserie.Date },
          timeserie,
          { upsert: true, setDefaultsOnInsert: true }
        ).exec()
      )
    )
    .then((promises) => Promise.all(promises));
}

export default fetchAndPersistIntradayTimeSeries;
