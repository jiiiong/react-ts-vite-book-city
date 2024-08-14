## 预览

因主要针对移动端开发，**预览请调小窗口宽度**，[点击此处预览网上书城](http://121.40.63.216/)

## 技术栈

- 编程语言：TypeScript
- 构建系统：Vite
- 前端框架：React
- CSS 工具：PostCSS、Tailwind、SCSS
- 规范化工具：ESLint、Prettier、EditorConfig
- 兼容性工具：browserslist

## 项目完成内容

### 基础通用组件开发
- 样式组件：卡片、Space
- 功能组件：
	- 懒加载图片、无限加载、可折叠文本、滑动条
	- 倒计时、对话框、遮罩层、弹窗、导航栏、侧边栏、弹出提示

### 自定义 Hooks
- useRequset：封装 SWR 和 Axios，主要是为了解析本项目 api 特殊的数据格式
- useReadLocalStorage：基于 useSyncExternalStore 封装读取浏览器 LocalStorage 的数据，并让依赖自定义事件实现同步最新的数据
- useIntersectionObserver：为 component 提供其与指定元素的相交情况数据。
- useResizeObserver：为 component 提供响应对应 DOM 元素发生 Resize 的能力

### 路由与打包
- 基于 React Router 实现页面路由
- 使用 React.lazy 和 React.Suspense 实现基于页面路由的代码分割

### 部署
- 使用 GithubPages 部署，存在跨域问题，尝试用免费 CORS代理（[allOrigins](https://allorigins.win/)），性能太差
- 在阿里云服务器上部署，并使用 Nginx 作代理解决跨域问题

## 网页功能

- 首页：
	- 轮播图展示海报；
	- 展示 热门精选、今日推荐、限时免费、排行榜等 书籍
	- 跳转到 搜索页、书架、排行榜等页面
- 搜索页：
	- 搜索书籍
	- 展示热门搜索
	- 支持保存搜索记录
- 书籍详情页：
  - 书籍简介
  - 支持展开书籍目录
  - 支持将书籍加入书架
- 书架页面：
	- 支持将收藏的书籍进行分组
	- 支持删除收藏的书籍与分组
- 书籍阅读页面：
	- 支持调整主题：字号、背景色、夜间模式
	- 滑动条调整书籍进度
