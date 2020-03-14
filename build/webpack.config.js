// webpack.config.js
// 参考链接：https://juejin.im/post/5de87444518825124c50cd36#heading-3
/*
  1.初始化项目 npm init
  2.安装webpack和webpack-cli npm i -D webpack webpack-cli (npm i --save-dev webpack webpack-cli )
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode:'development',//开发模式
  // entry:path.resolve(__dirname,'../src/main.js'),//入口文件
  // 多入口文件，使用多个html-webpack-pugin
  entry:{
    main:['@babel/polyfill',path.resolve(__dirname,'../src/main.js')],
    header:path.resolve(__dirname,'../src/header.js')
  },
  output:{
    filename:'[name].[hash:8].js', //打包后的名字，取哈希值前8位
    path:path.resolve(__dirname,'../dist') //打包后的目录
  },
  //插件
  plugins:[
    // 处理html模板，将js文件自动引入到html中
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',// 输出文件名
      chunks:['main']// 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/header.html'),
      filename:'header.html',
      chunks:['header']// 与入口文件对应的模块名
    }),
    new CleanWebpackPlugin(),//清楚上次打包残留的文件
    new MiniCssExtractPlugin({
      filename:'[name].[hash].css',
      chunkFilename:'[id].css'
    })
  ],
  module:{
    // 配置规则
    rules:[
      // {
      //   test:/\.less$/,
      //   use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
      // }
      // 处理css文件
      {
        test:/\.css$/,
        use:['style-loader','css-loader']//从右向左的规则
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader',{
          loader:'postcss-loader',
          options:{
            plugin:[require('autoprefixer')] //添加浏览器前缀
          }
        },'less-loader']//postcss-loader为css添加浏览器前缀
      },
      // 打包图片、字体、媒体等文件，大文件用file-loader，小的文件用url-loader转为base64编码
      {
        test:/\.(jpe?g|png|gif)$/,// 图片文件
        use:[
          {
            loader:'url-loader',
            options:{
              limit:10240,
              fallback:{
                loader:'file-loader',
                options:{
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]

      },
      // 用babel转义js文件，需要安装 babel-loader @babel/preset-env @babel/core
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          },
        },
        exclude:/node_modules/
      }
    ]
  }

}