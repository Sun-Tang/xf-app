module.exports = {
    devServer: {
        //proxy:"http://backend-api-01.newbee.ltd"//支配配置一个跨域
        proxy: {
            "/api": {
                target: "http://backend-api-01.newbee.ltd",
            },
        },
    },
};
