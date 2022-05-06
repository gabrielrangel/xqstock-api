import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function NotFound(message: string): IHttpError {
  return {
    status: HttpStatusEnum.NotFound,
    code: HttpStatusCodeEnum.NotFound,
    type: "Http Exception",
    message,
  };
}

export default NotFound;
