import https from "../https";

export default {
  getOrder(pageNum, pageSize) {
    let params = { pageNum, pageSize };
    return https.fetchGet("/api/manage/order/list", params);
  },
  searchOrder(type, value, pageNum, pageSize) {
    let params = { type, value, pageNum, pageSize };
    return https.fetchGet("/api/manage/order/search", params);
  },
  getOrderInfo(value) {
    let params = { value };
    return https.fetchGet("/api/manage/order/info", params);
  }
};
