import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function PartialContent(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.NoContent,
    code: HttpStatusCodeEnum.NoContent,
    message,
  };
}

export default PartialContent;
