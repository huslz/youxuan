import https from "../https";

export default {
  getCategory(parentId, pageNum, pageSize) {
    let params = { parentId, pageNum, pageSize };
    return https.fetchGet("/api/manage/category/list", params);
  },
  getCategoryName(categoryId) {
    let params = { categoryId };
    return https.fetchGet("/api/manage/category/info", params);
  },
  updateCategory(categoryId, categoryName) {
    let params = { categoryId, categoryName };
    return https.fetchPost("/api/manage/category/update", params);
  },
  addCategory(parentId, categoryName) {
    let params = { parentId, categoryName };
    return https.fetchPost("/api/manage/category/add", params);
  }
};
