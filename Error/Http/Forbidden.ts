import { IHttpError } from "./type";
import HttpStatusEnum from "./Enum/HttpStatus";
import HttpStatusCodeEnum from "./Enum/HttpStatusCode";

export function Forbidden(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.Forbidden,
    code: HttpStatusCodeEnum.Forbidden,
    message,
  };
}

export default Forbidden;
