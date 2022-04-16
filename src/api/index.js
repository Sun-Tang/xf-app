import http from "./http";
//获取购物车
const shopCart = () => {
    return http.get('/shop-cart')
}
//我的订单管理--订单管理

//获取全部订单
const order = (pageNumber = 1) => {
    return http.get('/order', {
        params: {
            pageNumber
        }
    })
}
//获取待付款订单
const payOrder = (pageNumber = 1, status = 0) => {
    return http.get('/order', {
        params: {
            pageNumber,
            status
        }
    })

}
//获取待确认订单
const uncertainOrder = (pageNumber = 1, status = 1) => {
    return http.get('/order', {
        params: {
            pageNumber,
            status
        }
    })
}
//获取待发货订单
const unsendOrder = (pageNumber = 1, status = 2) => {
    return http.get('/order', {
        params: {
            pageNumber,
            status
        }
    })
}
//获取已发货订单
const sendOrder = (pageNumber = 1, status = 3) => {
    return http.get('/order', {
        params: {
            pageNumber,
            status
        }
    })
}
//获取交易完成订单
const sendedOrder = (pageNumber = 1, status = 4) => {
    return http.get('/order', {
        params: {
            pageNumber,
            status
        }
    })
}

//地址管理--地址列表
const detailAddress = () => {
    return http.get('/api/address')
}
//新增地址
export function addAddress(data) {
    return http.post('/address', data)
}
//修改地址
const updateAddress = () => {
    return http.get('/api/address/7773')
}
//删除地址
const deleteAddress = () => {
    return http.delete('/api/address/7773')
}
export default {
    shopCart,
    order,
    payOrder,
    uncertainOrder,
    unsendOrder,
    sendOrder,
    sendedOrder,
    detailAddress,
    addAddress,
    updateAddress,
    deleteAddress

}