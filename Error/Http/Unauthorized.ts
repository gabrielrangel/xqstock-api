import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function Unauthorized(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.Unauthorized,
    code: HttpStatusCodeEnum.Unauthorized,
    message,
  };
}

export default Unauthorized;
