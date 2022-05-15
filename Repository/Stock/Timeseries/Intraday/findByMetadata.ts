import { IntradayTimeSeriesRepository } from "./index";
import { DateUtils } from "@api/util/DateUtils";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";

export default async function findByMetadata(metadata: TStockMetadataModel) {
  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(
    metadata,
    DateUtils.getLastWeekday()
  );
}
