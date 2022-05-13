export const AlphaAdvantageApiErrorType = "Alpha Advantage Api Error";

export function AlphaAdvantageApiError(message: string) {
  return {
    type: AlphaAdvantageApiError,
    message,
  };
}
