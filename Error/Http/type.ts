import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";

export interface IHttpError extends Error {
  name: "Http Exception";
  status: HttpStatusEnum;
  code: HttpStatusCodeEnum;
  message: string;
}
