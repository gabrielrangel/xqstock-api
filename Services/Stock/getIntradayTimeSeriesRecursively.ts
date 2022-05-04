import getMetadataRecursively from "@api/Services/Stock/getMetadataRecursively";
import AlphaAdvantageApi from "@lib/AlphaAdvantageApi";
import StockIntradayTimeSeriesModel from "@api/Models/Stock/IntradayTimeSeries";
import dbConnect from "@lib/dbConnect";
import normalizeAlphaAdvantageObjKeys from "@lib/AlphaAdvantageApi/util/normalizeAlphaAdvantageObjKeys";

export default async function getIntradayTimeSeriesRecursively(symbol: string) {
  await dbConnect();

  const metadata = await getMetadataRecursively(symbol);

  if (!metadata) {
    throw Error(`Cannot find IntradayTimeSeries with symbol: ${symbol}`);
  }

  const StockIntradayTimeSeries = await StockIntradayTimeSeriesModel.findOne({
    symbol: metadata.symbol,
  }).exec();

  if (StockIntradayTimeSeries) {
    return StockIntradayTimeSeries;
  }

  const { ["Time Series (Daily)"]: data } =
    await AlphaAdvantageApi().timeSeriesDaily(metadata.symbol, "full");

  const timeSeries = Object.entries(data).reduce(
    (acc, [date, dataObj]) => [
      ...acc,
      Object.assign(
        { date: new Date(date) },
        normalizeAlphaAdvantageObjKeys(dataObj)
      ),
    ],
    []
  );

  await Promise.all(
    timeSeries.map((timeserie) =>
      StockIntradayTimeSeriesModel.create({
        ...timeserie,
        symbol: metadata.symbol,
      })
    )
  );

  return StockIntradayTimeSeriesModel.find({ symbol: metadata.symbol });
}
