import { IMetadata, ITimeSerie } from "./../types";
import normalizeAlphaAdvantageObjKeys from "./../util/normalizeAlphaAdvantageObjKeys";
import { endpointsEnum } from "../types/enum/endpointsEnum";
import { functionsEnum } from "../types/enum/functionsEnum";
import sendApiRequest from "../util/sendApiRequest";
import { ITimeSeriesIntradayExtended } from "../types/IAlphaApiResponse";

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
    TimeSeries[key] = normalizeAlphaAdvantageObjKeys(value) as ITimeSerie;
  });

  return { MetaData, TimeSeries };
}

export default timeSeriesIntradayExtended;
