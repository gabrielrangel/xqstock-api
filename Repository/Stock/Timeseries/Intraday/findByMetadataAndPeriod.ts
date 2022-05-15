import { AlphaAdvantageService } from "@api/Services/AlphaAdvantageService";
import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  StockTimeSerieSchemaType,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import { FilterQuery } from "mongoose";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";

export async function findByMetadataAndPeriod(
  metadata: TStockMetadataModel,
  endDate: string | Date,
  startDate?: string | Date
): Promise<(TStockTimeSeriesModel | null)[]> {
  const { Symbol } = metadata;

  const filter: FilterQuery<StockTimeSerieSchemaType> = {
    Kind: "intraday",
    Symbol: Symbol.toUpperCase(),
    Date: {
      $lte: new Date(endDate),
    },
  };

  if (startDate) {
    filter.Date["$gte"] = new Date(startDate);
  }

  await dbConnect();

  const timeSeries = await StockTimeSerieModel.find(filter).exec();

  const curAndPevDatesList = timeSeries.map((ts, i, list) => [
    ts.Date,
    list[--i]?.Date,
  ]);
  const dateDiff = curAndPevDatesList.map(([cur, prev]) =>
    differenceInBusinessDays(cur, prev ?? cur)
  );
  const maxDateDiff = Math.max(...dateDiff);

  if (maxDateDiff < 1 && timeSeries.length > 0) {
    return timeSeries;
  }
  await AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(
    metadata,
    new Date(endDate),
    startDate ? new Date(startDate) : undefined
  );

  return StockTimeSerieModel.find(filter).exec();
}

export default findByMetadataAndPeriod;
