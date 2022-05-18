import { IAlphaApiResponse } from "./../types/IAlphaApiResponse";
import axios, { AxiosRequestConfig } from "axios";
import getEnv from "./getEnv";
import normalizeAlphaAdvantageObjKeys from "./normalizeAlphaAdvantageObjKeys";
import { AlphaAdvantageApiError } from "./AlphaAdvantageApiError";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";

//@ts-ignore
global.alphaApi = global.alphaApi ?? {};

//@ts-ignore
const lastCalls: Date[] = global.alphaApi.lastCalls ?? [];

export default async function sendApiRequest(
  params: Record<string, string>,
  path: string
): Promise<IAlphaApiResponse> {
  const { API_KEY: apikey, BASE_URI } = getEnv();

  const queryParams = Object.entries(Object.assign(params, { apikey }))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const url = BASE_URI.concat(path, "?", queryParams);

  const request: AxiosRequestConfig = {
    url,
    method: "GET",
  };

  const msSinceLastCall = differenceInMilliseconds(
    new Date(),
    lastCalls.shift() ?? new Date()
  );

  if (msSinceLastCall < 60000) {
    await new Promise((r) => setTimeout(r, 60000 - msSinceLastCall));
  }

  lastCalls.push(new Date());

  console.log(`Updating Stock Database: ${JSON.stringify(request)}`);

  return axios(request)
    .then((res) => {
      const errorMsg = res.data["Error Message"] ?? res.data["Note"];

      if (errorMsg) {
        const error = AlphaAdvantageApiError(errorMsg, params.function);
        console.error(error);
        throw error;
      }

      return res.data;
    })
    .then((res) => normalizeAlphaAdvantageObjKeys(res) as IAlphaApiResponse);
}
