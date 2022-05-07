import { dbConnect } from "@api/lib/dbConnect";
import BadRequest from "@api/Error/Http/BadRequest";
import { JwtCredentialModel } from "@api/Models/JwtCredential/index";
import jwt from "jsonwebtoken";

export async function register(email: string) {
  await dbConnect();

  const oldUser = await JwtCredentialModel.findOne({ email }).exec();
  const jwtToken: string | undefined = process.env.JWT_TOKEN;

  if (!jwtToken) {
    throw new Error(
      "Missing environment variable for JWT Authentication: JWT_TOKEN"
    );
  }

  if (oldUser) {
    throw BadRequest(`The given mail is already registered: ${email}`);
  }

  const credential = await JwtCredentialModel.create({
    email: email.toLowerCase(),
  });

  const token = jwt.sign({ credential_id: credential._id, email }, jwtToken);

  credential.token = token;

  return credential;
}

export default register;
