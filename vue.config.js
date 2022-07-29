// const px2rem = require('postcss-px2rem')

// const postcss = px2rem({
//   remUnit: 100 // 基准值
// })
module.exports = {
  // publicPath: './', 
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.pc.5laoye.com/service/admin",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         postcss
  //       ]
  //     }
  //   }
  // }
}