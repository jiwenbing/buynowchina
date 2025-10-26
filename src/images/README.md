# 商品图片管理指南

## 目录结构

```
src/images/
├── product-1/          # 商品1的图片
│   ├── 1.jpg          # 主图
│   ├── 2.jpg          # 细节图
│   └── 3.jpg          # 包装图
├── product-2/          # 商品2的图片
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── product-3/          # 商品3的图片
│   └── ...
└── README.md          # 本文件
```

## 图片命名规范

### 目录命名
- 每个商品有独立的目录
- 目录名格式：`product-{商品ID}`
- 例如：`product-1`, `product-2`, `product-3`

### 图片命名
- 主图：`1.jpg` - 商品的主要展示图
- 细节图：`2.jpg` - 商品细节或功能展示
- 包装图：`3.jpg` - 商品包装或使用场景
- 可以添加更多：`4.jpg`, `5.jpg` 等

## 图片规格要求

### 尺寸规范
- 建议尺寸：400x400px (正方形)
- 最小尺寸：300x300px
- 最大尺寸：800x800px
- 格式：JPG 或 PNG

### 质量要求
- 图片清晰，无水印
- 背景简洁，突出商品
- 光线充足，色彩真实
- 文件大小控制在500KB以内

## 添加新商品图片

### 步骤
1. 创建新的商品目录：`mkdir src/images/product-9`
2. 将图片放入目录并重命名：
   - `1.jpg` - 主图
   - `2.jpg` - 细节图
   - `3.jpg` - 包装图
3. 在 `products.json` 中更新图片路径：
   ```json
   "images": [
     "/src/images/product-9/1.jpg",
     "/src/images/product-9/2.jpg",
     "/src/images/product-9/3.jpg"
   ]
   ```

## 图片来源建议

### 1688商品图片获取
1. 访问1688商品详情页
2. 右键保存商品主图
3. 截取商品细节图和包装图
4. 重命名并放入对应目录

### 其他来源
- 供应商提供的产品图片
- 自行拍摄的商品图片
- 免费图片网站（确保无版权问题）

## 图片优化

### 压缩工具
- 在线工具：TinyPNG, Squoosh
- 本地工具：ImageOptim (Mac), GIMP
- 命令行：`convert image.jpg -quality 85 -resize 400x400^ -gravity center -crop 400x400+0+0 output.jpg`

### 批量处理
```bash
# 批量压缩当前目录所有jpg图片
for file in *.jpg; do
  convert "$file" -quality 85 -resize 400x400^ -gravity center -crop 400x400+0+0 "compressed_$file"
done
```

## 当前图片状态

- ✅ product-1: 已完成 (3张图片)
- ⏳ product-2: 待添加
- ⏳ product-3: 待添加
- ⏳ product-4: 待添加
- ⏳ product-5: 待添加
- ⏳ product-6: 待添加
- ⏳ product-7: 待添加
- ⏳ product-8: 待添加

## 注意事项

1. **版权问题**: 确保使用的图片有合法使用权
2. **文件大小**: 控制图片文件大小，避免影响加载速度
3. **命名一致**: 严格按照命名规范，便于管理
4. **备份重要**: 保留原始高清图片作为备份
5. **定期清理**: 删除不再使用的图片文件
