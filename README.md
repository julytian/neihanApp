# 内涵段子 webapp

接口爬取IOS App。

假如你克隆代码先把 根目录下的 `index.html` 删除，然后修改 `index-dev.html`改为`index.html`

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# vue技术栈

* vuejs
* vue-router
* vue-resource
* webpack-zepto
* vue-dplayer 视频播放器
* vue-preview 图片预览


# 上线修改

如果为了配合github页面，`npm run build`前提把 config/index.js 里面的第十行的 `/` 改为 `./`:

```js
    assetsPublicPath: './',
```

然后把 `dist`目录里面的内容放在根目录下.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
