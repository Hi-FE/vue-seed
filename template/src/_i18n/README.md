### 示例

1. 新建路由/已有路由 `_router/product.js`，对应的在 `_router/index` 配置上业务类型 `{ type: 'product', routes: product }`。
2. 新建语言包 `_i18n/zh-TW/default.json`、`_i18n/zh-TW/product.json`。
3. 此时，项目即有了 `zh-TW` 语言包，当加载 `product` 业务路由时，会自动加载 `product`、`default` 语言包。
4. 修改语言，设置默认语言 `_config/index` ，可使用 `zh-TW`。

### 说明

##### 依赖 vue-i18n
- 多语言实现依赖 vue-i18n
- 可使用 vue-i18n 提供的 api, 可以使用额外封装的 `changeLocale / resetLocale` 方法，具体见下方说明

##### 新建语言
- 当前目录下的文件夹 (en-US、zh-CN) 即为语言包目录。
- 各个语言包（zh-CN）按照路由业务类型划分，每种业务路由加载对应业务语言。`default.json` 为默认包，所有路由都会加载。（ps: 新建路由时，可以配置业务类型，具体见 `_router/index` ）
- 新建语言，直接新建对应原因的文件夹即可。
- 命名风格按照此 [规范](https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.10)，比如 en-US、zh-CN 对应美式英语、中文简体。

##### 修改语言
- `this.$i18n.changeLocale('zh-CN')` 修改当前语言，并且保存至 `localStorage` 中。

##### 重置语言
- `this.$i18n.resetLocale()` 重置语言为初始指定语言。