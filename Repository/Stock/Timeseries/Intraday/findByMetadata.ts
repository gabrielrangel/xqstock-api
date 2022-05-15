import {IntradayTimeSeriesRepository} from "./index";
import {DateUtils} from "@api/util/DateUtils";
import {IStockMetaDataModel} from "@api/Models/Stock/Metadata";

export default async function findByMetadata(metadata: IStockMetaDataModel) {
  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(
    metadata,
    DateUtils.getLastWeekday()
  );
}
