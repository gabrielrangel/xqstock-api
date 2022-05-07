import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function BadRequest(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.BadRequest,
    code: HttpStatusCodeEnum.BadRequest,
    message,
  };
}

export default BadRequest;
