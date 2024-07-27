## **HTTP接口管理平台 Mock Server**

### 项目简介

本项目是一个基于Node.js和Express框架构建的HTTP接口管理平台。该平台主要用于模拟实际业务逻辑，提供用户注册、登录、菜单权限管理、文件上传以及API调用等功能。通过这个Mock服务器，前后端团队可以独立开发并测试各自的组件，同时确保在集成阶段能够无缝对接。

### 主要功能模块

- **路由模块**

  - 用户相关路由 (`/api-control-hub/user`)
  - 项目相关路由 (`/api-control-hub/project`)
  - 接口模拟相关路由 (`/api-control-hub/mock`)
  - HTTP请求处理相关路由 (`/api-control-hub/http`)

- **用户管理**

  - 注册接口 (`/api-control-hub/register`)
  - 登录接口 (`/api-control-hub/login`)
  - 退出登录接口 (`/api-control-hub/logout`)
  - 用户信息模拟接口 (`/api-control-hub/account/list`)

- **资源管理**

  - 视频上传接口 (`/api-control-hub/file/video`)
  - 图片上传接口 (`/api-control-hub/file/upload`)

- **权限控制**

  - 获取用户菜单接口 (`/api-control-hub/menu/list`)
  - 获取按钮权限接口 (`/api-control-hub/auth/buttons`)

- **启动与配置**

  - 服务运行于指定端口，默认为5000端口。

  ```javascript
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`Mock server is running on port ${PORT}`);
  });
  ```

### 数据源与依赖

- 使用 `express.json()` 中间件解析JSON格式的请求体。
- 引入了静态本地JSON数据文件用于模拟用户菜单 (`./static/localMenu.json`) 和按钮权限 (`./static/localAuth.json`)。
- 使用 Mockjs (`require('mockjs')`) 可能用于生成部分模拟响应数据。

### 示例接口说明

1. 注册、登录、退出登录接口提供了基本的用户认证功能，返回状态码及消息提示。
2. 菜单和按钮权限接口根据请求头中的访问令牌判断用户角色，并返回相应的权限数据。
3. 文件上传接口模拟了视频和图片上传成功后的响应，返回存储链接地址。
4. 首页 (`/api-control-hub`) 提供了一个简单的欢迎界面，确认服务正常运行。

### 如何使用

- 启动服务器：在终端中执行 `npm run dev` 可开启热部署，或者`npm run build`之后使用`npm run start`启动服务器。
- 开发者可通过调用上述接口进行模拟测试或集成到前端应用中。
- `sequelize-auto -o "./src/models" -d achs -h localhost -u 数据库账号 -p 数据库端口 -x 数据库密码 -e mysql -l ts`可以快速生成数据库模型

注意：由于代码中包含硬编码的模拟数据和固定密码，请在实际生产环境中替换为真实数据库连接和安全的身份验证机制。
