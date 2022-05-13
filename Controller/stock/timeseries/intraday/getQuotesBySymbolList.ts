import getQuotesBySymbol from "@api/Controller/stock/timeseries/intraday/getQuotesBySymbol";

export async function getQuotesBySymbolList(
  symbolList: string[],
  startDate?: string,
  endDate?: string
) {
  return Promise.all(
    symbolList.map(symbol => getQuotesBySymbol(symbol, startDate, endDate))
  )
}

export default getQuotesBySymbolList;
