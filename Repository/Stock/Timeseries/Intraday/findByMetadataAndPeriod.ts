import { AlphaAdvantageService } from "@api/Services/AlphaAdvantageService";
import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  StockTimeSerieSchemaType,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import { FilterQuery } from "mongoose";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import hasMissingDays from "@api/Services/TimeSeries/hasMissingDays";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousFriday from "date-fns/previousFriday";
import isSameDay from "date-fns/isSameDay";

export async function findByMetadataAndPeriod(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
): Promise<(TStockTimeSeriesModel | null)[]> {
  const { Symbol, Region } = metadata;

  const filter: FilterQuery<StockTimeSerieSchemaType> = {
    Kind: "intraday",
    Symbol: Symbol.toUpperCase(),
    Date: {
      $lte:
        isSaturday(endDate) || isSunday(endDate)
          ? previousFriday(endDate)
          : endDate,
    },
  };

  if (startDate) {
    filter.Date["$gte"] = new Date(startDate);
  }

  const timeSeries = await dbConnect().then(() =>
    StockTimeSerieModel.find(filter).sort({ Date: 1 }).exec()
  );

  if (
    timeSeries.length > 0 &&
    timeSeries.some(({ Date }) => isSameDay(Date, filter.Date.$lte)) &&
    !(await hasMissingDays(timeSeries, Region, filter.Date.$lte))
  ) {
    return timeSeries;
  }

  await AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(metadata);

  return dbConnect().then(() =>
    StockTimeSerieModel.find(filter).sort({ Date: 1 }).exec()
  );
}

export default findByMetadataAndPeriod;
