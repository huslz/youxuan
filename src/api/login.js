import https from "../https";

export default {
  loginCheck(username, password) {
    let params = { username: username, password: password };
    return https.fetchPost("/api/login", params);
  }
};
