# frontend

项目一行概述

## 项目介绍

> 尽可能精简

说明主要包含的业务模块，业务功能。
可以附上一张业务架构图

## 启动方式（应用跑起来的步骤）

### 前置依赖

+ node >= 16
+ pnpm >= 7

### 启动步骤

项目根目录执行:

```sh
pnpm run dev
```

## 目录结构说明

```txt
.
├── dist/                                               # 构建产物
├── docs/                                               # 项目文档
├── public/                                             # 前端资源
│   ├── static/                                         # 静态资源
│   │   ├── fonts/                                      # 字体
│   │   └── imgs/                                       # 图片
│   ├── favicon.ico                                     # 网站图标
│   └── index.html                                      # html 模板
├── src/                                                # 源码目录
│   ├── common/                                         # 全局公共能力
│   │   ├── ajax.ts                                     # 基础请求函数，全局请求逻辑在这里加
│   │   └── index.ts                                    # 全局公共能力统一导出
│   ├── components/                                     # 全局组件
│   ├── constants/                                      # 全局常量，枚举值
│   │   └── index.ts
│   ├── directives/                                     # 全局 vue 指令
│   ├── filters/                                        # 全局 vue 过滤器
│   ├── modules/                                        # 页面
│   │   └── PageName/                                   # 具体页面，驼峰拼写方式
│   │       ├── components/                             # 页面组件
│   │       ├── hooks/                                  # 页面级别 hooks
│   │       ├── modules/                                # 子页面
│   │       ├── PageName.vue                            # 页面代码
│   │       ├── api.ts                                  # 页面请求接口定义
│   │       └── index.ts                                # 统一对外导出
│   ├── router/                                         # 路由文件
│   │   └── index.ts
│   ├── store/                                          # Vuex
│   │   └── index.ts
│   ├── types/                                          # 类型定义
│   ├── utils/                                          # 全局工具函数
│   │   └── index.ts
│   ├── App.vue                                         # 应用组件
│   └── main.ts                                         # 应用入口
├── CHANGELOG.md                                        # npm 包变更记录
├── README.md                                           # 项目说明
├── package.json
├── pure.config.js                                      # 统一 CLI 工具配置
└── pnpm-lock.yaml
```

## 注意事项

开发需要注意的坑
