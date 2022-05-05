import findByMetadata from "./findByMetadata";
import findByMetadataAndPeriod from "./findByMetadataAndPeriod";
import findOldest from "../findOldest";
import findOldestBySymbol from "./findOldestBySymbol";

export const IntradayTimeSeriesRepository = {
  findByMetadata,
  findByMetadataAndPeriod,
  findOldest,
  findOldestBySymbol,
};

export default IntradayTimeSeriesRepository;
