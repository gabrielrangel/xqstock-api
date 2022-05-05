import { IMetadata, IMetadataTimeSeries, ITimeSerie } from "./../types";
import normalizeAlphaAdvantageObjKeys from "./../util/normalizeAlphaAdvantageObjKeys";
import { endpointsEnum } from "../types/enum/endpointsEnum";
import { functionsEnum } from "../types/enum/functionsEnum";
import sendApiRequest from "../util/sendApiRequest";

interface IIntradayTimeSeries {
  MetaData: IMetadataTimeSeries;
  TimeSeries: ITimeSerie;
}

export async function timeSeriesIntradayExtended(
  symbol: string,
  outputsize: "compact" | "full" = "compact"
): Promise<IIntradayTimeSeries> {
  let { MetaData, TimeSeries } = await sendApiRequest(
    {
      function: functionsEnum.timeSeriesIntradayDaily,
      symbol,
      outputsize,
    },
    endpointsEnum.timeSeriesIntradayDaily
  );

  MetaData = normalizeAlphaAdvantageObjKeys(MetaData);

  Object.entries(TimeSeries).forEach(
    ([key, value]) => (TimeSeries[key] = normalizeAlphaAdvantageObjKeys(value))
  );

  return { MetaData, TimeSeries } as IIntradayTimeSeries;
}

export default timeSeriesIntradayExtended;
