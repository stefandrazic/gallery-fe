import HttpService from "./Http.service";

export default class AuthService extends HttpService {
  static async register(data) {
    return await this.request({
      method: "POST",
      url: `/signup`,
      data,
    });
  }
  static async login(data) {
    return await this.request({
      method: "POST",
      url: `/signin`,
      data,
    });
  }
}
