# Buy Now China - Telegram Mini App

一款专为中俄跨境电商设计的Telegram小程序，主打优质中国商品直供俄罗斯商家。

## 功能特性

### 🛍️ 核心功能
- **商品展示**: 首页直接呈现中国商品列表
- **商品详情**: 详细的商品信息、规格参数和供应商信息
- **直接沟通**: 通过Telegram与中国商家直接沟通
- **购买意向**: 支持购买意向提交和试用申请
- **多语言支持**: 中文、英文、俄文三语言切换

### 🔧 技术特性
- **Telegram Mini App**: 基于Telegram Web App SDK
- **响应式设计**: 适配各种设备屏幕
- **现代化UI**: 美观的用户界面和流畅的交互体验
- **多语言国际化**: 完整的i18n支持

## 项目结构

```
buyNowChina/
├── src/
│   ├── components/          # React组件
│   │   ├── Header.tsx       # 头部组件
│   │   ├── ProductList.tsx  # 商品列表
│   │   ├── ProductCard.tsx  # 商品卡片
│   │   ├── ProductDetail.tsx # 商品详情
│   │   ├── SearchBar.tsx    # 搜索栏
│   │   ├── CategoryFilter.tsx # 分类筛选
│   │   ├── SupplierInfo.tsx # 供应商信息
│   │   ├── PurchaseIntentModal.tsx # 购买意向弹窗
│   │   ├── ProductImageGallery.tsx # 商品图片画廊
│   │   └── LanguageSelector.tsx # 语言选择器
│   ├── data/
│   │   └── mockData.ts      # 模拟数据
│   ├── i18n/                # 国际化配置
│   │   ├── index.ts         # i18n配置
│   │   └── locales/         # 语言文件
│   │       ├── zh.json      # 中文
│   │       ├── en.json      # 英文
│   │       └── ru.json      # 俄文
│   ├── styles/
│   │   └── global.css       # 全局样式
│   ├── types/
│   │   └── index.ts         # TypeScript类型定义
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── public/
│   └── bnc-logo.png         # 应用Logo
├── package.json             # 项目配置
├── vite.config.ts           # Vite配置
└── README.md               # 项目说明
```

## 安装和运行

### 前置要求
- Node.js (版本 16+)
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```
应用将在 http://localhost:5173 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## Telegram Mini App 配置

1. 在Telegram中创建Bot（通过 @BotFather）
2. 设置Web App URL为你的应用域名
3. 配置菜单按钮来启动Mini App

## 主要功能说明

### 商品浏览
- 首页展示商品列表，支持分类筛选和搜索
- 商品卡片显示图片、价格、供应商等关键信息
- 点击商品进入详情页

### 商品详情
- 高清商品图片画廊
- 详细商品描述和规格参数
- 供应商信息和评级
- 直接联系供应商功能

### 沟通交流
- 通过Telegram直接与供应商沟通
- 支持购买意向提交
- 支持试用申请

### 多语言支持
- 界面语言：中文、英文、俄文
- 商品信息多语言显示
- 自动语言检测

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: CSS-in-JS (styled-jsx)
- **国际化**: react-i18next
- **Telegram集成**: @twa-dev/sdk

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues: [GitHub Issues](https://github.com/your-username/buyNowChina/issues)
- 邮箱: your-email@example.com

---

**Buy Now China** - 连接中俄商贸，优质商品直达
