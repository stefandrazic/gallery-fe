import axios from "axios";

export default class HttpService {
  static client = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Accept: "application/json",
    },
  });

  static async request({ method, url, data, params }) {
    const response = await this.client.request({
      method,
      url,
      data,
      params,
      headers: {
        // Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response?.data;
  }
}
