import HttpService from "./Http.service";

export default class GalleriesService extends HttpService {
  static async getAll(page = 1) {
    const response = await this.request({
      method: "GET",
      url: "/galleries",
      params: {
        perPage: 10,
        page,
      },
    });
    return { data: response.data, metadata: response.metadata };
  }

  static async getSingle(id) {
    const response = await this.request({
      method: "GET",
      url: `/galleries/${id}`,
    });
    return response?.data;
  }

  static async create(data) {
    const response = await this.request({
      method: "POST",
      url: "/galleries",
      data,
    });
    return response?.data;
  }
}
