import { AlphaAdvantageApi } from "@api/lib/AlphaAdvantageApi";
import { StockTimeSerieKindEnum } from "@api/Models/Stock/TimeSeries/types";
import dbConnect from "@api/lib/dbConnect";

import StockIntradayTimeSeriesModel, {
  StockTimeSerieSchemaType,
} from "@api/Models/Stock/TimeSeries";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";

const { ALPHA_API_RETRY_TIMEOUT } = process.env;

export async function fetchAndPersistIntradayTimeSeries(
  { Symbol }: TStockMetadataModel,
  endDate: Date = new Date(Date.now()),
  startDate?: Date
) {
  const extraObj = { Kind: StockTimeSerieKindEnum.INTRADAY, Symbol };
  const outputCount = differenceInBusinessDays(
    endDate,
    startDate ?? new Date(0)
  );
  const outputSize = outputCount < 100 ? "compact" : "full";

  let TimeSeries: StockTimeSerieSchemaType[] | undefined;

  let timeOut = false;
  setTimeout(() => (timeOut = true), Number(ALPHA_API_RETRY_TIMEOUT ?? 0));

  while (!TimeSeries && !timeOut) {
    TimeSeries = await AlphaAdvantageApi.timeSeriesIntradayExtended(
      Symbol,
      outputSize
    )
      .then(({ TimeSeries: data }) =>
        Object.entries(data).map(
          ([Date, timeSerie]) =>
            Object.assign(timeSerie, {
              ...extraObj,
              Date,
            }) as unknown as StockTimeSerieSchemaType
        )
      )
      .catch(() => undefined);
  }

  if (!TimeSeries) {
    return;
  }

  await dbConnect();

  Promise.all(
    TimeSeries.map((timeserie) =>
      StockIntradayTimeSeriesModel.findOneAndUpdate(
        { ...extraObj, Date: timeserie.Date },
        timeserie,
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      ).exec()
    )
  );
}

export default fetchAndPersistIntradayTimeSeries;
