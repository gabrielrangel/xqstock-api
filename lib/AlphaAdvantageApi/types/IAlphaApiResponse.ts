// noinspection JSUnusedGlobalSymbols

import { ITimeSerie } from "@api/lib/AlphaAdvantageApi";
import { IMetadata } from "@api/lib/AlphaAdvantageApi";
import { IMetadataSymbolSearch } from "./IMetadata";

export interface ISymbolSearchResponse {
  Bestmatches?: IMetadataSymbolSearch[];
}

export interface ITimeSeriesIntradayExtended {
  MetaData: IMetadata;
  TimeSeries: Record<string, ITimeSerie>;
}

export type IAlphaApiResponse =
  | ISymbolSearchResponse
  | ITimeSeriesIntradayExtended;

export default IAlphaApiResponse;
