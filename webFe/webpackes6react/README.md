# reactjs + webpack + es6 demo

- 项目概况:
    - 此项目采用reactjs + webpack + es6完成构建和开发

- 开发环境准备:
    - 最好在OS或者linux平台开发此代码
    - 安装nodejs(版本大于等于4.2.0)
    - npm install(如果install速度慢,可以将nmp的镜像换为淘宝的镜像,更换方法,执行 npm config set registry https://registry.npm.taobao.org,执行完后再npm install)

- 启动本地调试环境:
    - 执行npm start
    - 在浏览器中打开http://localhost:3000/

- 编译&发布:
    - 编译: 执行npm run build(编译完后的资源会被放入static文件夹中)
    - 发布: 先编译,即执行npm run build

- 项目结构:
    -static (编译后资源)

    -node_moudules (依赖的node模块)

    -src (资源路径)

        -components (所有页面公用的react组件)

        -pages (开发的页面)

    -.babelrc (babel的配置文件,一般不动)

    -package.json (此项目依赖的node模块配置文件,一般不动)

    -README.md (项目描述文件,一般不动)

    -server.js (执行npm start时执行的文件,启动本地运行环境,一般不动)

    -webpack.config.js (webpack打包的配置文件)


