//node 语法
const path = require('path');

//webpack 5.21中才添加的__webpack_base_uri__，设置值后 html-webpack-plugin 才能正常使用
__webpack_base_uri__ = "http://localhost:9000";

const webpack = require('webpack'); // 启用热更新的 第2步
// 导入在内存中生成 HTML 页面的 插件
// 只要是插件，都一定要 放到 plugins 节点中去
// 这个插件的两个作用：
//  1. 自动在内存中根据指定页面生成一个内存的页面
//  2. 自动，把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin');

//3.处理.vue 文件，Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: 'development',//添加
    devtool: 'inline-source-map',//显示错误来自于哪个源文件
    entry: path.join(__dirname,'./src/index.js'),// 入口，表示，要使用 webpack 打包哪个文件
    //// 输出文件相关的配置  npm run build 编码输出到dist目录
    output: {
        path: path.join(__dirname, 'dist'),// 指定 打包好的文件，输出到哪个目录中去
        filename: 'main.js',// 这是指定 输出的文件的名称
        clean: true
    },
    //webpack-dev-server 配置  npm install --save-dev webpack-dev-server  安装服务  npm run dev 启动服务
    devServer: {
        contentBase: path.join(__dirname, 'dist'),//将 dist 目录下的文件 serve 到 localhost:8080 下
        // compress: true,//启用压缩
        port: 9000,//server 监听端口
        open: true,//自动启动默认浏览器
        hot: true // 启用热更新 的 第1步
    },
    // 配置插件的节点
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//启用热更新的第 3 步,new 一个热更新的 模块对象
        new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML  页面的插件  npm i html-webpack-plugin --save-dev
            template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename: 'index.html',// 指定生成的页面的名称
            publicPath: 'auto'
        }),
        new VueLoaderPlugin()//4.处理.vue 文件，Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
    ],
    // 这个节点，用于配置 所有 第三方模块 加载器 
    module: {
        // 所有第三方模块的 匹配规则
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },//  配置处理 .css 文件的第三方loader 规则  npm i style-loader css-loader --save-dev
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//  配置处理 .less 文件的第三方loader 规则  npm i less-loader less --save-dev
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },//  配置处理 .scss 文件的第三方loader 规则  npm i sass-loader node-sass --save-dev

            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为ba { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loaderse64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader npm i url-loader file-loader --save-dev

            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },// 处理 字体文件的 loader npm i url-loader file-loader --save-dev

            /* ## 使用babel 6处理高级JS语法
            // 1. 运行 npm i babel-core babel-loader babel-plugin-transform-runtime --save-dev 安装babel的相关loader包
            // 2. 运行 npm i babel-preset-es2015 babel-preset-stage-0 --save-dev 安装babel转换的语法
            // 3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项
            4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：            
                {
                    "presets":["es2015", "stage-0"],
                    "plugins":["transform-runtime"]
                }

            5. ** 注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；
            */
            // { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }  // ## 使用babel 6处理高级JS语法

            //## 使用babel 7处理高级JS语法  npm install babel-loader @babel/core @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/preset-env @babel/runtime -D
            {
                test: /\.js$/, exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                [require("@babel/plugin-transform-runtime"), { "legacy": true }],
                                [require("@babel/plugin-proposal-class-properties"), { "legacy": true }]
                            ]
                        }
                    }
                ]
            },
            //  1.npm i vue -S
            // 2.处理 .vue 文件的 loader    npm i vue-loader vue-template-compiler -D   
            //Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
            { test: /\.vue$/, use: 'vue-loader' }
            
        ]
    },
    resolve: {
        //别名
        alias: {
            //import 设置vue包路径，导入 ./node_modules/vue/dist/vue.js  vue.js 是全量包， import 默认导入 vue.runtime.common.js 是runtime包
            "vue$": "vue/dist/vue.js"
        }
    }
}

/*
创建一个目录，初始化 npm，然后 在本地安装 webpack，接着安装 webpack-cli
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev




// 当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 做了以下几步：
//  1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
//  2. webpack 就会去 项目的 根目录中，查找一个叫做 `webpack.config.js` 的配置文件
//  3. 当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中，导出的配置对象
//  4. 当 webpack 拿到 配置对象后，就拿到了 配置对象中，指定的 入口  和 出口，然后进行打包构建；


 */