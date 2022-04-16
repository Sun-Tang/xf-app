module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 37.5, // 根据公司设计稿调整 750 => 75  375 => 37.5
            propList: ["*"],
        },
    },
};
