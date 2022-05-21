import { HttpStatusCodeEnum } from ".//Enum/HttpStatusCode";
import { HttpStatusEnum } from "./Enum/HttpStatus";
import { IHttpError } from "./type";

export function PartialContent(message: string): IHttpError {
  return {
    name: "Http Exception",
    status: HttpStatusEnum.PartialContent,
    code: HttpStatusCodeEnum.PartialContent,
    message,
  };
}

export default PartialContent;
