import https from "../https";

export default {
  updateRoles(_id, menus, auth_time, auth_name) {
    let params = { _id, menus, auth_time, auth_name };
    return https.fetchPost("/api/manage/role/update", params);
  },
  addRole(roleName) {
    let params = { roleName };
    return https.fetchPost("/api/manage/role/add", params);
  }
};
