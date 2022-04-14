import http from "./http";

export function test() {
    return http.post('/shop-cart')
}