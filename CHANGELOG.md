# 变更记录

撒砂系统 Demo 版本追溯。每次改动写入 `[未发布]`；对外发版时移至 `vX.Y.Z` 节并打 Git tag。

部署地址（CloudBase）：见控制台「云托管 → sasha-demo → 访问地址」  
仓库：`https://github.com/lanliu369/sasha_demo`

---

## [未发布]

- **fix(运行监测)**：补注册「大屏预览」菜单（`/display/screen`）；此前页面已实现但未入菜单导致 404；推送配置页增加「打开大屏预览」入口
- **fix(数据存储)**：菜单「全链路追溯」更名为「数据追溯」（路径仍为 `/storage/trace`），与 PPT 及业务用语一致
- **style(运行监测)**：重构大屏预览示例 UI（16:9 指挥中心布局、KPI 条、设备/进度/告警三栏、实时时钟与作业量柱状图）
- **refactor(菜单)**：移除「砂数据追溯」一级菜单及子页面路由；旧 `/lifecycle/*`、`/sand/*` 链接重定向至首页或数据存储追溯页
- **refactor(模块对接)**：移除「移动终端推送配置」菜单及 `/exchange/mobile` 路由；旧链接重定向至「移动终端权限」页
- **style(工作台)**：「司机风险排行」从运营态势总览移至「作业进度概览」下方

---

## v1.0.0 — 2026-06-08

**对外说明**：首次 CloudBase 部署，供甲方在线体验 Demo。

- **chore(部署)**：新增 CloudBase 云托管配置（`Dockerfile`、`.dockerignore`、`next.config.ts` standalone）
- **feat(全局)**：初始化 Demo（工作台、调度、展示、模型、预警等模块 Mock 交互）
- **style(全局)**：移除页面标题旁「飞书/BI 风格」类介绍文案

**Git tag**：`v1.0.0`（发版时执行 `git tag -a v1.0.0 -m "首次对外演示版"`）
