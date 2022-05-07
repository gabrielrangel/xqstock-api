export function getToken(): string {
  const jwtToken: string | undefined = process.env.JWT_TOKEN;

  if (!jwtToken) {
    throw new Error(
      "Missing environment variable for JWT Authentication: JWT_TOKEN"
    );
  }

  return jwtToken;
}
