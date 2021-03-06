import StockTimeSerieModel, {
  StockTimeSerieKindEnum,
  TStockTimeSeriesModel,
} from "@api/Models/Stock/TimeSeries";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import addDays from "date-fns/addDays";
import dbConnect from "@api/lib/dbConnect";

export async function hasMissingDays(
  timeSeries: TStockTimeSeriesModel[],
  Region: string,
  endDateIn: Date | string,
  startDateIn?: Date | string
) {
  const endDate = new Date(endDateIn);
  const startDate = startDateIn && new Date(startDateIn);

  if (
    startDate &&
    differenceInBusinessDays(endDate, startDate) === timeSeries.length
  ) {
    return false;
  }

  if (timeSeries.length === 0) {
    return true;
  }

  const timeSeriesWithEdgeDates = [
    { Date: startDate } as TStockTimeSeriesModel,
    ...timeSeries,
    { Date: endDate } as TStockTimeSeriesModel,
  ];

  const datesBetween = timeSeriesWithEdgeDates.map(
    ({ Date: dateRight }, i, arr) => {
      const dateLeft = arr[i + 1]?.Date ?? dateRight;

      const diff =
        differenceInBusinessDays(new Date(dateLeft), new Date(dateRight)) - 1;

      return Array.from({ length: diff }, (_, i) =>
        addDays(new Date(dateRight), i + 1)
      );
    }
  );

  const flatDatesBetween = datesBetween.flat();

  const timeseriesInDatesBetween = await dbConnect().then(() => {
    const $or = flatDatesBetween.map((Date) => ({
      Region,
      Date,
      Kind: StockTimeSerieKindEnum.INTRADAY,
    }));

    return $or.length ? StockTimeSerieModel.find({ $or }).exec() : [];
  });

  return timeseriesInDatesBetween.length > 0;
}

export default hasMissingDays;
