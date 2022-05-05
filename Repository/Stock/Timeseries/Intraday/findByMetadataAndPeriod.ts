import { AlphaAdvantageService } from "../../../../Services/AlphaAdvantageService/index";
import dbConnect from "@lib/dbConnect";
import { IStockTimeSerie } from "@api/Models/Stock/TimeSeries";
import { Query, FilterQuery } from "mongoose";
import { IMetadata } from "@lib/AlphaAdvantageApi";
import { IntradayTimeSeriesRepository } from "..";
import { TimeSeriesRepository } from "..";

export async function findByMetadataAndPeriod(
  metadata: Partial<IMetadata>,
  endDate: string | Date,
  startDate?: string | Date
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  const { Symbol } = metadata;

  const filter: FilterQuery<IStockTimeSerie> = {
    Kind: "intraday",
    Symbol,
    Date: {
      $leq: new Date(endDate),
    },
  };

  if (startDate) {
    filter.Date["$geq"] = new Date(startDate);
  }

  await dbConnect();

  const oldest = await IntradayTimeSeriesRepository.findOldestBySymbol(
    Symbol
  ).exec();

  if (oldest?.Date < new Date(endDate)) {
    return TimeSeriesRepository.find(filter);
  }

  return AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(
    metadata,
    new Date(endDate),
    new Date(startDate)
  );
}

export default findByMetadataAndPeriod;
