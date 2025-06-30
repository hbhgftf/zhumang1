# 项目文件结构说明

## 目录结构

```
uniapp/
├── pages/                          # 页面目录
│   ├── index/                      # 首页相关
│   │   └── index.vue              # 主首页
│   ├── video-call/                 # 视频通话模块
│   │   ├── caller.vue             # 主叫方页面（视障用户）
│   │   └── spxz/                  # 视频协助相关页面
│   ├── volunteer/                  # 志愿者模块
│   │   ├── index.vue              # 志愿者主页
│   │   └── register.vue           # 志愿者注册页面
│   ├── user/                       # 用户模块
│   │   └── profile.vue            # 用户个人中心
│   ├── travel/                     # 出行模块
│   │   └── travel-appointment/    # 出行预约相关页面
│   ├── common/                     # 通用页面
│   │   ├── core-functionality.vue # 核心功能页面
│   │   ├── about.vue              # 关于我们
│   │   ├── feedback.vue           # 意见反馈
│   │   └── faq.vue                # 常见问题
│   ├── policy/                     # 政策模块
│   │   ├── policy.vue             # 政策查询
│   │   ├── detail.vue             # 政策详情
│   │   └── favorites.vue          # 我的收藏
│   ├── admin/                      # 管理模块
│   │   └── index.vue              # 管理后台
│   ├── basicInfo/                  # 基础信息
│   │   └── basicInfo.vue          # 基本信息页面
│   └── debug/                      # 调试模块
│       └── debug.vue              # 调试工具页面
├── utils/                          # 工具类目录
│   ├── GenerateTestUserSig.js     # 腾讯云UserSig生成工具
│   └── websocket-debug.js         # WebSocket调试工具
├── static/                         # 静态资源
├── uni_modules/                    # uni-app插件
├── config.js                       # 配置文件
├── pages.json                      # 页面配置
└── manifest.json                   # 应用配置
```

## 模块说明

### 1. 视频通话模块 (video-call/)
- **caller.vue**: 主叫方页面，视障用户发起视频通话
- **spxz/**: 视频协助相关页面

### 2. 志愿者模块 (volunteer/)
- **index.vue**: 志愿者主页，显示在线状态和服务范围
- **register.vue**: 志愿者注册页面

### 3. 用户模块 (user/)
- **profile.vue**: 用户个人中心，个人信息管理

### 4. 出行模块 (travel/)
- **travel-appointment/**: 出行预约相关页面

### 5. 通用页面 (common/)
- **core-functionality.vue**: 核心功能展示页面
- **about.vue**: 关于我们页面
- **feedback.vue**: 意见反馈页面
- **faq.vue**: 常见问题页面

### 6. 政策模块 (policy/)
- **policy.vue**: 政策查询页面
- **detail.vue**: 政策详情页面
- **favorites.vue**: 我的收藏页面

### 7. 工具类 (utils/)
- **GenerateTestUserSig.js**: 腾讯云TUICallKit UserSig生成工具
- **websocket-debug.js**: WebSocket连接调试工具

## 页面跳转路径更新
