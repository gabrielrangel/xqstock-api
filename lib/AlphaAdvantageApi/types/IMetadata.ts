export interface IMetadata {
  Symbol: string;
  TimeZone: string;
}

export interface IMetadataSymbolSearch extends IMetadata {
  Name: string;
  Type: string;
  Region: string;
  Marketopen: string;
  Marketclose: string;
  Currency: string;
  Matchscore: string;
}
