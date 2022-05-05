import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";

export interface IHttpError {
  status: HttpStatusEnum;
  code: HttpStatusCodeEnum;
  message: string;
  type: "Http Exception";
}
