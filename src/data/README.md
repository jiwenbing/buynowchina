# 商品数据维护指南

## 文件结构

- `products.json` - 商品数据主文件，包含所有商品、供应商、分类和图片路径信息
- `mockData.ts` - 数据加载器，从JSON文件读取数据并转换为应用所需格式
- `../images/` - 商品图片目录，按产品ID组织

## 商品数据格式

### 供应商 (Suppliers)

```json
{
  "id": "supplier-1",
  "name": "张伟",
  "company": "深圳优质电子有限公司",
  "telegramUsername": "zhangwei_electronics",
  "location": "深圳市",
  "rating": 4.8,
  "verified": true,
  "responseTime": "< 1小时",
  "languages": ["zh", "en"]
}
```

### 分类 (Categories)

```json
{
  "id": "electronics",
  "name": "电子产品",
  "nameEn": "Electronics",
  "nameRu": "Электроника",
  "icon": "📱",
  "productCount": 3
}
```

### 商品 (Products)

```json
{
  "id": "product-1",
  "name": "iPhone 15 Pro Max 手机壳",
  "description": "高品质硅胶材质，完美贴合，提供全方位保护。防摔防刮，手感舒适。",
  "price": 15.99,
  "currency": "USD",
  "images": [
    "https://images.unsplash.com/photo-1601972599720-ad7c65b05ea1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop"
  ],
  "category": "electronics",
  "supplierId": "supplier-1",
  "specifications": [
    {
      "key": "材质",
      "value": "硅胶"
    }
  ],
  "inStock": true,
  "minOrderQuantity": 100,
  "createdAt": "2024-01-15T08:00:00Z"
}
```

## 维护操作

### 添加新商品

1. 在 `products.json` 的 `products` 数组中添加新商品对象
2. 确保 `supplierId` 对应已存在的供应商
3. 确保 `category` 对应已存在的分类
4. 更新对应分类的 `productCount`

### 修改商品信息

1. 直接在 `products.json` 中修改对应商品的属性
2. 保存文件后刷新页面即可看到更改

### 添加新供应商

1. 在 `products.json` 的 `suppliers` 数组中添加新供应商
2. 确保 `id` 唯一
3. 在商品中使用对应的 `supplierId`

### 添加新分类

1. 在 `products.json` 的 `categories` 数组中添加新分类
2. 确保 `id` 唯一
3. 在商品中使用对应的 `category`

### 图片管理

图片现在按产品ID组织存储：

```
src/images/
├── product-1/
│   ├── 1.jpg    # 主图
│   ├── 2.jpg    # 细节图
│   └── 3.jpg    # 包装图
└── product-2/
    ├── 1.jpg
    └── ...
```

商品对象中的图片路径：
```json
{
  "images": [
    "/src/images/product-1/1.jpg",
    "/src/images/product-1/2.jpg",
    "/src/images/product-1/3.jpg"
  ]
}
```

图片管理规则：
- 每个商品有独立的图片目录
- 图片按编号命名：1.jpg, 2.jpg, 3.jpg
- 建议图片尺寸为 400x400px (正方形)
- 每个商品建议2-4张图片
- 本地存储，便于版本控制和管理

### 数据简化

为了便于维护，商品信息已简化：
- 商品名称和描述只保留中文版本
- 规格参数只保留 `key` 和 `value` 字段
- 所有信息集中在一个文件中管理

## 注意事项

1. **JSON格式**: 确保JSON语法正确，可以使用在线JSON验证工具检查
2. **ID唯一性**: 所有的ID必须唯一，包括商品ID、供应商ID、分类ID
3. **关联关系**: 商品的 `supplierId` 必须对应存在的供应商
4. **分类统计**: 修改商品分类后，记得更新对应分类的 `productCount`
5. **价格格式**: 价格使用数字格式，不要包含货币符号
6. **日期格式**: 使用ISO 8601格式 (YYYY-MM-DDTHH:mm:ssZ)

## 路由功能

应用现在支持路由功能：
- 首页：`/` - 显示所有商品列表
- 商品详情：`/product/{商品ID}` - 显示特定商品的详情页面

点击商品后，URL会自动变为 `/product/product-1` 这样的格式，便于分享和收藏。

## 开发流程

1. 修改 `products.json` 文件
2. 保存文件
3. 刷新浏览器页面
4. 检查修改是否生效

修改后的数据会立即在应用中生效，无需重启开发服务器。

## 示例操作

### 添加新商品
```json
{
  "id": "product-9",
  "name": "新商品名称",
  "description": "商品描述...",
  "price": 99.99,
  "currency": "USD",
  "images": [
    "https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop"
  ],
  "category": "electronics",
  "supplierId": "supplier-1",
  "specifications": [
    {
      "key": "材质",
      "value": "塑料"
    }
  ],
  "inStock": true,
  "minOrderQuantity": 100,
  "createdAt": "2024-01-20T10:00:00Z"
}
```

### 修改商品图片
直接在商品的 `images` 数组中添加、删除或替换图片URL即可。
