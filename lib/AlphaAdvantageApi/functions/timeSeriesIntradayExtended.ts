import { IMetadata, IMetadataTimeSeries, ITimeSerie } from "./../types";
import normalizeAlphaAdvantageObjKeys from "./../util/normalizeAlphaAdvantageObjKeys";
import { endpointsEnum } from "../types/enum/endpointsEnum";
import { functionsEnum } from "../types/enum/functionsEnum";
import sendApiRequest from "../util/sendApiRequest";
import { ITimeSeriesIntradayExtended } from "../types/IAlphaApiResponse";

interface IIntradayTimeSeries {
  MetaData: IMetadataTimeSeries;
  TimeSeries: ITimeSerie;
}

export async function timeSeriesIntradayExtended(
  symbol: string,
  outputsize: "compact" | "full" = "compact"
): Promise<ITimeSeriesIntradayExtended> {
  let { MetaData, TimeSeries } = (await sendApiRequest(
    {
      function: functionsEnum.timeSeriesIntradayDaily,
      symbol,
      outputsize,
    },
    endpointsEnum.timeSeriesIntradayDaily
  )) as ITimeSeriesIntradayExtended;

  MetaData = normalizeAlphaAdvantageObjKeys(MetaData) as IMetadata;

  Object.entries(TimeSeries).forEach(([key, value]) => {
    //@ts-ignore
    TimeSeries[key] = normalizeAlphaAdvantageObjKeys(value);
  });

  return { MetaData, TimeSeries };
}

export default timeSeriesIntradayExtended;
