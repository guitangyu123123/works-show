const path = require('path')
module.exports = {
  //配置打包的入口文件
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'diss'),
    filename:'mm.js'
  }
}
