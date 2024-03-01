import HttpService from "./Http.service";

export default class AuthService extends HttpService {
  static async register(data) {
    return await this.request({
      method: "POST",
      url: `/register`,
      data,
    });
  }
  static async login(data) {
    return await this.request({
      method: "POST",
      url: `/login`,
      data,
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      // },
    });
  }
}
