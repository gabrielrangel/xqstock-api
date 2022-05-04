import findAllBySymbol from "./findAllBySymbol";
export * from "./findAllBySymbol";

import findAllBySymbolAndPeriod from "./findAllBySymbolAndPeriod";
export * from "./findAllBySymbolAndPeriod";

export const TimeSeriesIntradayRepository = {
  findAllBySymbol,
  findAllBySymbolAndPeriod,
};

export default TimeSeriesIntradayRepository;
