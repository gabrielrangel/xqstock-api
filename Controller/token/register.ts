// noinspection JSUnusedGlobalSymbols

import { getToken } from "@api/lib/jwt/getToken";
import { dbConnect } from "@api/lib/dbConnect";
import BadRequest from "@api/Error/Http/BadRequest";
import { JwtCredentialModel } from "@api/Models/JwtCredential";
import jwt from "jsonwebtoken";

export async function register(email: string) {
  await dbConnect();

  const oldUser = await JwtCredentialModel.findOne({ email }).exec();
  const jwtToken = getToken();

  if (oldUser) {
    throw BadRequest(`The given mail is already registered: ${email}`);
  }

  const credential = await JwtCredentialModel.create({
    email: email.toLowerCase(),
  });

  credential.token = jwt.sign({ credential_id: credential._id, email }, jwtToken);

  return credential;
}

export default register;
