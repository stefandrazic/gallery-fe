import HttpService from "./Http.service";

export default class GalleriesService extends HttpService {
  static async getAll(page = 1, search = "", userId) {
    const response = await this.request({
      method: "GET",
      url: "/galleries",
      params: {
        perPage: 10,
        page,
        search,
        userId,
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

  static async delete(id) {
    const response = await this.request({
      method: "DELETE",
      url: `/galleries/${id}`,
    });
    return response;
  }

  static async edit(id, data) {
    const response = await this.request({
      method: "PUT",
      url: `/galleries/${id}`,
      data: data,
    });
    return response?.data;
  }
}
