import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function NotFound(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.NotFound,
    code: HttpStatusCodeEnum.NotFound,
    message,
  };
}

export default NotFound;
