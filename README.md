# plugin
自己做的一些插件
----------------
## 1. fileupload
#### 文件上传，基于Node(Express框架)，支持多文件上传，进度条。使用了formidable
#### 使用步骤：
1. 初始化项目环境
```javascript
npm init
```
2. 用到的框架、模块
```javascript
npm install --save express
npm install --save swig
npm i -S --save formidable
```
3. 目录结构
```
fileupload/
├── node_modules/
│   ├── 一些依赖
│   └── ···
├── public/
|     ├── css/
|     |   └──form.css
|     ├── image/
|     │   └── 存放上传的文件
|     └── js/
|         └── action.js
├── routers/
|   └── index.js
├── views/
|   ├── error.html
|   ├── index.html
|   └── success.html
├── app.js      
└── package.json
```
4. app.js是启动文件
5. 其余文件中均有注释，image是存放上传文件的文件夹，上传文件的文件夹一定要先创建。
6. [node-formidable源码](https://github.com/felixge/node-formidable)         [Node.js的Formidable模块的使用--中文](http://www.cnblogs.com/yuanke/archive/2016/02/26/5221853.html)
