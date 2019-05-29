const path = require("path");
const base = path.join(__dirname, "..");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(base, "src", "index.js"),
  devtool: 'cheap-module-source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(base, "dist")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    /**
    1. contentBase 指定项目根目录
    2. historyApiFallback 主要应用在单页应用的开发场景，它依赖于 HTML5 history API，如果设置为 true，所有的跳转将指向 index.html
    3. inline 主要是解决了自动浏览器自动刷新问题
    4. lazy 默认为 false，若开启后，则 webpack-dev-server 不再监测文件变化自动编译，只有等到我们手动刷新浏览器的时候才会编译文件
    5. proxy 可以有效的解决开发阶段的跨域问题，毕竟不是所有的前端项目，都有独立的 nodejs 作为中间件去请求服务，更多的还是把前端项目编译后与后端服务部署在一起。而开发阶段又相对独立，这时候就可以利用 proxy 将前端请求转发到后端测试服务器，不影响开发
    **/
    contentBase: path.resolve(base, 'dist'),
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    inline: true,
    proxy: {
      "/api": "http://localhost:8000"
    },
    stats: {
      colors: true,
    },
  },
  module: {
	rules: [
	  {
	    test: /\.jsx?$/,
	    exclude: /node_modules/,
	    use: {
	      loader: 'babel-loader',
	      options: { // babel 转义的配置选项
	        babelrc: false,
	        presets: [
	          require.resolve('@babel/preset-react'),
	          [require.resolve('@babel/preset-env'), { modules: false }],
	        ],
	        cacheDirectory: true,
	      },
	    },
	  },
	],
	},
  plugins: [
	new HtmlWebPackPlugin({
	  template: "src/index.html",
	  filename: "index.html"
	})
  ]
};

