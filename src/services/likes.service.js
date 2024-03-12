import HttpService from "./Http.service";

export default class LikesService extends HttpService {
  static async like(data) {
    const response = await this.request({
      method: "POST",
      url: "/like",
      data: data,
    });
    return response;
  }
  static async dislike(data) {
    const response = await this.request({
      method: "POST",
      url: "/dislike",
      data: data,
    });
    return response;
  }
}
