import http from "./http";
import md5 from "js-md5";
export function test() {
    return http.get("/user/info");
    // 获取用户信息
}
// 注册接口
function register(name, psw) {
    return http.post("/user/register", {
        loginName: name,
        password: psw,
    });
}
//登录接口
function login(name, psw) {
    return http.post("/user/login", {
        loginName: name,
        passwordMd5: md5(psw),
    });
}
//首页信息接口
function getIndexInfo() {
    return http.get("/index-infos");
}

export default {
    register,
    login,
    getIndexInfo,
    test,
};
