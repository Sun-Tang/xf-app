import axios from "axios";
import {
	Notify
} from "vant";
import router from '../router/index.js';

axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? 'http://backend-api-01.newbee.ltd/api/v1' : '/api/v1';

const http = axios.create({
	baseURL: ''

})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
	let token = localStorage.getItem("xfdata");
	if (token) {
		config.headers.token = token;
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

http.interceptors.response.use(response => {
	if (+response.data.resultCode != 200) {
		//取消掉详情页面的重复弹框
		if (response.data.message.includes("已存在")) {
			return response.data;
		}

		Notify({
			type: 'danger',
			message: response.data.message || "系统繁忙"
		});
		if (+response.data.resultCode == 416) { //跳转到 登录页面，去登录
			router.push("/login?needback=true");
		}
	}
	return response.data;
}, reason => {
	console.log('当前网络繁忙，请您稍后再试~');
	return Promise.reject(reason);
});

export default http;