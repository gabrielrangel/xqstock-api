import { timeSeriesIntradayExtended } from "./functions/timeSeriesIntradayExtended";
export * from "./functions/timeSeriesIntradayExtended";

import { symbolSearch } from "./functions/symbolSearch";
export * from "./functions/symbolSearch";

export * from "./types";

export const AlphaAdvantageApi = {
  symbolSearch,
  timeSeriesIntradayExtended,
};

export default AlphaAdvantageApi;
