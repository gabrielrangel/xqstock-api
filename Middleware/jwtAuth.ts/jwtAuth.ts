import Unauthorized from "@api/Error/Http/Unauthorized";
import { getToken } from "@api/lib/jwt/getToken";
import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

function jwtAuth(req: Request, res: Response, next?: NextFunction) {
  const { UNAUTHENTICATED_PATHS } = process.env;

  if (UNAUTHENTICATED_PATHS && req.url.match(UNAUTHENTICATED_PATHS)) {
    return next && next();
  }

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    throw Unauthorized("A token is required for authentication" + req.url);
  }

  const jwtToken = getToken();

  try {
    jwt.verify(token, jwtToken, {ignoreExpiration: true});
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next && next();
}

export default jwtAuth;
