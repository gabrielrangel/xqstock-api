import dbConnect from "@api/lib/dbConnect";
import StockTimeSerieModel, {
  StockTimeSerieSchemaType,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import { FilterQuery } from "mongoose";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

export async function findByMetadataAndPeriod(
  metadata: TStockMetadataModel,
  endDate: Date,
  startDate?: Date
): Promise<TStockTimeSeriesModel[]> {
  const { Symbol } = metadata;

  const filter: FilterQuery<StockTimeSerieSchemaType> = {
    Kind: "intraday",
    Symbol: Symbol.toUpperCase(),
    Date: {
      $lte: endDate,
    },
  };

  if (startDate) {
    filter.Date.$gte = startDate;
  }

  return dbConnect().then((_) =>
    StockTimeSerieModel.find(filter).sort({ Date: 1 }).exec()
  );
}

export default findByMetadataAndPeriod;
