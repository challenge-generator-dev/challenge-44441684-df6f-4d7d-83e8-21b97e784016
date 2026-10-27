// Modelo de datos para productos con atributos como nombre, precio, stock y categoría.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number = 0,
    name: string = '',
    price: number = 0,
    stock: number = 0,
    category: string = '',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Product {
    return new Product(
      json.id,
      json.name,
      json.price,
      json.stock,
      json.category,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      category: this.category,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('El nombre del producto es obligatorio.');
    }
    if (this.price <= 0) {
      errors.push('El precio debe ser mayor que cero.');
    }
    if (this.stock < 0) {
      errors.push('El stock no puede ser negativo.');
    }
    if (!this.category || this.category.trim().length === 0) {
      errors.push('La categoría es obligatoria.');
    }
    return { valid: errors.length === 0, errors };
  }
}