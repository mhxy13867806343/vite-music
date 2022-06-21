// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375,
            unitPrecision: 6,
            propList: ["*"],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: true,
            exclude: [],
            landscape: false
        },
    },
};
