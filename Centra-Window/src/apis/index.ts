import { API_HOST } from "../configs";

const ENDPOINT = {
  upload: `${API_HOST}/upload`,
};

export class FormAPI {
  constructor() {}

  static async uploadForm(data: FormData) {
    const res = await fetch(ENDPOINT.upload, {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      const { message } = (await res.json()) as { message: string };
      return message;
    }
    return "";
  }
}
