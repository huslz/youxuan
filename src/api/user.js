import https from "../https";

export default {
  getUserList(pageNum, pageSize) {
    let params = { pageNum, pageSize };
    return https.fetchGet("/api/manage/user/list", params);
  },
  deleteUser(id) {
    let params = { userId: id };
    return https.fetchPost("/api/manage/user/delete", params);
  },
  updateUser(_id,username, phone, email, role_id) {
    let params = { _id, username, phone, email, role_id };
    return https.fetchPost("/api/manage/user/update", params);
  },
  addUser(username, password, phone, email, role_id) {
    let params = {username,password,phone,email,role_id};
    return https.fetchPost("/api/manage/user/add", params);
  }
};
