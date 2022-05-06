import { IAlphaApiResponse } from "./../types/IAlphaApiResponse";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import getEnv from "./getEnv";
import normalizeAlphaAdvantageObjKeys from "./normalizeAlphaAdvantageObjKeys";

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

  const response = await axios(request);

  const { ["Error Message"]: error } = response.data;

  if (error) {
    throw new AxiosError(error, response.status.toString(), request, response);
  }

  return normalizeAlphaAdvantageObjKeys(response.data) as IAlphaApiResponse;
}
