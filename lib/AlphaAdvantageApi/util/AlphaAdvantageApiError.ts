export const AlphaAdvantageApiErrorType = "Alpha Advantage Api Error";

export function AlphaAdvantageApiError(message: string, functionName: string) {
  return {
    type: AlphaAdvantageApiErrorType,
    message,
    function: functionName,
  };
}
