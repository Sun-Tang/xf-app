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

//购物车
function shopCart() {
    return http.get('/shop-cart')
}
//全部订单列表
function order(num, nums) {
    return http.get('/order', {
        params: {
            pageNumber: num,
            status: nums
        }
    })
}
//商品
function cartList(data) {
    return http.get('/shop-cart/settle', {
        params: {
            cartItemIds: data,
        }
    })
}

//生成订单
function saveOrder(id, ids) {
    return http.post('/saveOrder', {
        addressId: id,
        cartItemIds: ids,
    })
}

//支付成功
function paySuccess(data, num) {
    return http.get('/paySuccess', {
        params: {
            orderNo: data,
            payType: num
        }
    })
}
//订单详情
function orderDetail(id) {
    return http.get('/order/' + id)
}
//取消订单
function deleteOrder(id) {
    return http.put('/order/' + id + '/cancel')
}


//地址管理--地址列表
function detailAddress() {
    return http.get('/address')
}
//id查地址信息
function getAddressDetail(id) {
    return http.get('/address/' + id)
}
//新增地址
function addressList(data) {
    return http.post('/address', data)
}
//编辑地址
function updateAddress(obj) {
    return http.put('/address', obj)
}
//删除地址
function deleteAddress(id) {
    return http.delete('/address/' + id)
}
export default {
    register,
    login,
    getIndexInfo,
    test,
    shopCart,
    order,
    orderDetail,
    deleteOrder,
    detailAddress,
    getAddressDetail,
    addressList,
    updateAddress,
    deleteAddress,
    cartList,
    saveOrder,
    paySuccess

}