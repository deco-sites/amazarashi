import { importPKCS8, SignJWT } from "npm:jose@5.9.6";

export interface ServiceAccount {
  client_email: string;
  private_key: string;
  project_id: string;
}

export interface Token {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export const googleCloudAuth = async (serviceAccount: ServiceAccount, scopes: string[]): Promise<Token> => {
  const privateKey = await importPKCS8(serviceAccount.private_key, "RS256");
  const jwtToken = await new SignJWT({
    iss: serviceAccount.client_email,
    aud: "https://oauth2.googleapis.com/token",
    scope: scopes.join(" "),
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .setIssuer(serviceAccount.client_email)
    .setSubject(serviceAccount.client_email)
    .sign(privateKey);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`,
  });

  const data = await response.json();

  return data;
};
