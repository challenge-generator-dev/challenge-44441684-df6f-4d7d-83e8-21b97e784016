// Servicio para manejar operaciones CRUD de productos utilizando consultas SQL.

import { Injectable } from '@angular/core';
import { DatabaseService } from '@core/services/database.service';
import { Product } from '@core/models/product.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private databaseService: DatabaseService) {}

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    const query = `
      INSERT INTO products (name, price, stock, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      product.name,
      product.price,
      product.stock,
      product.category,
      product.createdAt.toISOString(),
      product.updatedAt.toISOString()
    ];
    
    return from(this.databaseService.executeQuery(query, params).then(result => {
      product.id = result.lastInsertRowid;
      return product;
    }));
  }

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    const query = 'SELECT * FROM products';
    return from(this.databaseService.executeQuery(query).then(rows => {
      return rows.map((row: any) => Product.fromJson(row));
    }));
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product | null> {
    const query = 'SELECT * FROM products WHERE id = ?';
    const params = [id];
    return from(this.databaseService.executeQuery(query, params).then(rows => {
      return rows.length > 0 ? Product.fromJson(rows[0]) : null;
    }));
  }

  // Actualizar un producto
  updateProduct(product: Product): Observable<Product> {
    const query = `
      UPDATE products
      SET name = ?, price = ?, stock = ?, category = ?, updatedAt = ?
      WHERE id = ?
    `;
    const params = [
      product.name,
      product.price,
      product.stock,
      product.category,
      product.updatedAt.toISOString(),
      product.id
    ];
    
    return from(this.databaseService.executeQuery(query, params).then(() => product));
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    const query = 'DELETE FROM products WHERE id = ?';
    const params = [id];
    return from(this.databaseService.executeQuery(query, params).then(() => {}));
  }

  // Verificar si un nombre de producto ya existe (excluyendo el ID actual en caso de actualización)
  productNameExists(name: string, excludeId?: number): Observable<boolean> {
    let query = 'SELECT COUNT(*) as count FROM products WHERE name = ?';
    const params: any[] = [name];
    
    if (excludeId !== undefined) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    return from(this.databaseService.executeQuery(query, params).then(rows => {
      return rows[0].count > 0;
    }));
  }
}