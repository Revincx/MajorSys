## 模拟转专业系统

### 如何配置

在`api/config.json`中设置如下字段：

* auth_url：用于身份验证的认证平台网址
* jiaowu_url：教务系统网址

在`api`目录下添加`.env`文件，并设置以下变量：

* DB_HOST：MySQL数据库主机名
* DB_PASS：MySQL数据库密码
* SIGN_KEY：Koa-session签名密钥，使用随机字符串即可。

在pages/home.vue中添加系统使用说明。

在你的MySQL数据库中运行`sql/mysql.sql`脚本。

### 如何运行

api文件夹中的代码为后端，直接使用`node index.js`或其他运行器（如nodemon,pm2等）启动即可。

根目录下的代码为前端，可使用`yarn dev`或`npm run dev`启动。使用`yarn build && nuxt generate`生成静态资源文件并部署。

### 鸣谢

[dairoot/school_api](https://github.com/dairoot/school-api) 正方教务系统Python版API
