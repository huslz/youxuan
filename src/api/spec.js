import https from "../https";

export default {
  getSpec(pageNum, pageSize) {
    let params = { pageSize, pageNum };
    return https.fetchGet("/api/manage/sysAttr/list", params);
  },
  searchSpec(value, pageNum, pageSize) {
    let params = { value, pageNum, pageSize };
    return https.fetchGet("/api/manage/sysAttr/search", params);
  },
  updateSpec(_id, name, category_id, option) {
    let params = { _id, name, category_id, option };
    return https.fetchPost("/api/manage/sysAttr/update", params);
  },
  deleteSpec(_id) {
    let params = { _id };
    return https.fetchPost("/api/manage/sysAttr/delete", params);
  },
  addSpec(name, c_id, option) {
    let params = { name, c_id, option };
    return https.fetchPost("/api/manage/sysAttr/add", params);
  }
};
