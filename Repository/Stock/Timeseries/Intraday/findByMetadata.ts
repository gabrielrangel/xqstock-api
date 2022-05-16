import { IntradayTimeSeriesRepository } from "./index";
import { TStockMetadataModel } from "@api/Models/Stock/Metadata";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousFriday from "date-fns/previousFriday";

export default async function findByMetadata(metadata: TStockMetadataModel) {
  const today = new Date(Date.now());
  const endDay =
    isSaturday(today) || isSunday(today) ? previousFriday(today) : today;

  return IntradayTimeSeriesRepository.findByMetadataAndPeriod(metadata, endDay);
}
