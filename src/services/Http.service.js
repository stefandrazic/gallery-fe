import axios from "axios";

export default class HttpService {
  static client = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Accept: "application/json",
    },
  });

  static async request({ method, url, data, params }) {
    const token = localStorage.getItem("token");
    let headers = {};
    if (token) {
      headers.Authorization = "Bearer " + token; // Set Authorization header
    }
    const response = await this.client.request({
      method,
      url,
      data,
      params,
      headers,
      // headers: {
      //   // Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
    return response?.data;
  }
}
