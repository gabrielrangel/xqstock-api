import { IntradayTimeSeriesRepository } from "./index";
import { IMetadata } from "@lib/AlphaAdvantageApi";
import getLastWeekday from "@api/util/getLastWeekday";

export default async function findByMetadata(metadata: Partial<IMetadata>) {
  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(
    metadata,
    getLastWeekday()
  );
}
