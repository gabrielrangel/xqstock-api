import StockTimeSerieModel, {
  StockTimeSerieKindEnum,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import addDays from "date-fns/addDays";
import dbConnect from "@api/lib/dbConnect";
import isToday from "date-fns/isToday";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import isSameDay from "date-fns/isSameDay";

export async function hasMissingDays(
  timeSeries: TStockTimeSeriesModel[],
  Region: string,
  endDay: Date
) {
  const datesBetween = timeSeries.map(({ Date: dateLeft }, i, arr) => {
    const dateRight = arr[i + 1].Date;

    if (!dateRight) {
      return [];
    }

    const diff = differenceInBusinessDays(dateLeft, dateRight);

    return Array.from({ length: diff }, (_, i) => addDays(dateLeft, i + 1));
  });

  const lastTimeSerie = timeSeries.pop();

  if (
    lastTimeSerie &&
    isToday(endDay) &&
    !isSaturday(endDay) &&
    !isSunday(endDay) &&
    !isSameDay(lastTimeSerie.Date, endDay)
  ) {
    return true;
  }

  const flatDatesBetween = datesBetween.flat();

  const timeseriesInDatesBetween = await dbConnect().then(() =>
    StockTimeSerieModel.find({
      $or: flatDatesBetween.map((Date) => ({
        Region,
        Date,
        Kind: StockTimeSerieKindEnum.INTRADAY,
      })),
    }).exec()
  );

  return timeseriesInDatesBetween.length > 0;
}

export default hasMissingDays;
