import { IAlphaApiResponse } from "./../types/IAlphaApiResponse";
import axios, { AxiosRequestConfig } from "axios";
import getEnv from "./getEnv";
import normalizeAlphaAdvantageObjKeys from "./normalizeAlphaAdvantageObjKeys";
import { AlphaAdvantageApiError } from "./AlphaAdvantageApiError";

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
