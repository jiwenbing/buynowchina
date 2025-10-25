import { Product, Category, Supplier } from '../types';
import productsData from './products.json';

// 从JSON文件加载供应商数据
export const mockSuppliers: Supplier[] = productsData.suppliers;

// 从JSON文件加载商品分类数据
export const mockCategories: Category[] = productsData.categories;

// 从JSON文件加载商品数据，并关联供应商信息
export const mockProducts: Product[] = productsData.products.map(product => ({
  ...product,
  supplier: mockSuppliers.find(supplier => supplier.id === product.supplierId)!
}));
