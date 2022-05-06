import { IMetadataSymbolSearch } from "@api/lib/AlphaAdvantageApi/types/IMetadata";
import { IntradayTimeSeriesRepository } from "./index";
import { DateUtils } from "@api/util/DateUtils";

export default async function findByMetadata(metadata: IMetadataSymbolSearch) {
  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(
    metadata,
    DateUtils.getLastWeekday()
  );
}
