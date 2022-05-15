import { normalizeAlphaAdvantageObjKeys } from "@api/lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";
import { IMetadataSymbolSearch } from "../types/IMetadata";
import { endpointsEnum } from "../types/enum/endpointsEnum";
import { functionsEnum } from "../types/enum/functionsEnum";
import sendApiRequest from "../util/sendApiRequest";
import { ISymbolSearchResponse } from "../types/IAlphaApiResponse";

export async function symbolSearch(
  keywords: string
): Promise<ISymbolSearchResponse> {
  let { Bestmatches } = (await sendApiRequest(
    {
      function: functionsEnum.symbolSearch,
      keywords,
    },
    endpointsEnum.timeSeriesIntradayDaily
  )) as ISymbolSearchResponse;

  if (Bestmatches) {
    Bestmatches = Object.values(Bestmatches).map((m) =>
      normalizeAlphaAdvantageObjKeys(m)
    ) as IMetadataSymbolSearch[];
  }

  return { Bestmatches };
}

export default symbolSearch;
