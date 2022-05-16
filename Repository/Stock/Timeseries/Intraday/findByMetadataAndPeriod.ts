import { AlphaAdvantageService } from "@api/Services/AlphaAdvantageService";
import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  StockTimeSerieSchemaType,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import { FilterQuery } from "mongoose";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";

export async function findByMetadataAndPeriod(
  metadata: TStockMetadataModel,
  endDate: string | Date,
  startDate?: string | Date
): Promise<(TStockTimeSeriesModel | null)[]> {
  const { Symbol, Region } = metadata;

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

  const timeSeries = await dbConnect().then(() =>
    StockTimeSerieModel.find(filter).sort({ Date: 1 }).exec()
  );

  if (
    !(await hasMissingDays(timeSeries, Region, filter.Date.$lte)) &&
    timeSeries.length > 0
  ) {
    return timeSeries;
  }

  await AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(
    metadata,
    new Date(endDate),
    startDate ? new Date(startDate) : undefined
  );

  return dbConnect().then(() =>
    StockTimeSerieModel.find(filter).sort({ Date: 1 }).exec()
  );
}

export default findByMetadataAndPeriod;
