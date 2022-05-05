import { normalizeAlphaAdvantageObjKeys } from "@api/lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";
import { IMetadataSymbolSearch } from "../types/IMetadata";
import { endpointsEnum } from "../types/enum/endpointsEnum";
import { functionsEnum } from "../types/enum/functionsEnum";
import sendApiRequest from "../util/sendApiRequest";

interface ISymbol {
  Bestmatches: IMetadataSymbolSearch[];
}

export async function symbolSearch(keywords: string): Promise<ISymbol> {
  let { Bestmatches } = await sendApiRequest(
    {
      function: functionsEnum.symbolSearch,
      keywords,
    },
    endpointsEnum.timeSeriesIntradayDaily
  );

  Bestmatches = Object.values(Bestmatches).map((m) =>
    normalizeAlphaAdvantageObjKeys(m)
  );

  return { Bestmatches } as ISymbol;
}

export default symbolSearch;
