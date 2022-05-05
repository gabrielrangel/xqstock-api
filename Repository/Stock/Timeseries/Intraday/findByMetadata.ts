import { IntradayTimeSeriesRepository } from "./index";
import { IMetadata } from "@api/lib/AlphaAdvantageApi";
import { DateUtils } from "@api/util/DateUtils";

export default async function findByMetadata(metadata: Partial<IMetadata>) {
  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(
    metadata,
    DateUtils.getLastWeekday()
  );
}
