import { googleCloudAuth, ServiceAccount, Token } from "site/utils/googleCloudAuth.ts";

const scopes = ["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/cloud-translation"];

interface GoogleCloudTranslateConstructor {
  projectId: string;
  credentials: ServiceAccount;
}

interface TranslateRequest {
  contents: string[];
  sourceLanguageCode: string;
  targetLanguageCode: string;
  parent: string;
}

interface RomanizeRequest {
  contents: string[];
  sourceLanguageCode: string;
  parent: string;
}
interface TranslateResponse {
  translations: {
    translatedText: string;
    model: string;
  }[];
}

interface RomanizeResponse {
  romanizations: {
    romanizedText: string;
    detectedLanguageCode: string;
  }[];
}
export class GoogleCloudTranslate {
  projectId: string;
  credentials: ServiceAccount;
  token: Token | null;
  constructor(props: GoogleCloudTranslateConstructor) {
    this.projectId = props.projectId;
    this.credentials = props.credentials;
    this.token = null;
  }

  async prepareToken() {
    const token = await googleCloudAuth(this.credentials, scopes);
    this.token = token;
    return token;
  }

  locationPath(projectId: string, location?: string): string {
    if (location) {
      return `projects/${projectId}/locations/${location}`;
    }
    return `projects/${projectId}`;
  }

  async translateText({ parent, ...request }: TranslateRequest): Promise<TranslateResponse> {
    let token: Token;
    if (this.token == null) {
      token = await this.prepareToken();
    } else {
      token = this.token;
    }

    const response = await fetch(`https://translation.googleapis.com/v3/${parent}:translateText`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      console.error("GoogleCloudTranslate", response);
      const error = await response.json();
      console.error("GoogleCloudTranslate", error);
      throw new Error(`HTTP error! status: ${response.status}. ${response.statusText}: ${await response.text()}`);
    }
    const data = await response.json();
    return data;
  }

  async romanizeText({ parent, ...request }: RomanizeRequest): Promise<RomanizeResponse> {
    let token: Token;
    if (this.token == null) {
      token = await this.prepareToken();
    } else {
      token = this.token;
    }

    const response = await fetch(`https://translation.googleapis.com/v3/${parent}:romanizeText`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      console.error("GoogleCloudTranslate", response);
      const error = await response.json();
      console.error("GoogleCloudTranslate", error);
      throw new Error(`HTTP error! status: ${response.status}. ${response.statusText}: ${await response.text()}`);
    }
    const data = await response.json();
    return data;
  }
}
