import { AlphaAdvantageService } from "@api/Services/AlphaAdvantageService/index";
import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  IStockTimeSerie,
} from "@api/Models/Stock/TimeSeries";
import { Query, FilterQuery } from "mongoose";
import { IMetadata, IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi";
import findOldestBySymbol from "./findOldestBySymbol";

export async function findByMetadataAndPeriod(
  metadata: IMetadataSymbolSearch,
  endDate: string | Date,
  startDate?: string | Date
): Promise<Query<IStockTimeSerie[], IStockTimeSerie, {}, IStockTimeSerie>> {
  const { Symbol } = metadata;

  const filter: FilterQuery<IStockTimeSerie> = {
    Kind: "intraday",
    Symbol,
    Date: {
      $lte: new Date(endDate),
    },
  };

  if (startDate) {
    filter.Date["$gte"] = new Date(startDate);
  }

  await dbConnect();

  const oldest = await findOldestBySymbol(Symbol);

  if (oldest?.Date < new Date(endDate)) {
    return StockTimeSerieModel.find(filter);
  }

  return AlphaAdvantageService.fetchAndPersistIntradayTimeSeries(
    metadata,
    new Date(endDate),
    startDate ? new Date(startDate) : undefined
  );
}

export default findByMetadataAndPeriod;
