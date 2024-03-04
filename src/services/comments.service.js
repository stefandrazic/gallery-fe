import HttpService from "./Http.service";

export default class CommentsService extends HttpService {
  static async create(data) {
    const response = await this.request({
      method: "POST",
      url: "/comments",
      data,
    });
    return response?.data;
  }
}
