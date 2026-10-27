// Modelo de datos para clientes con atributos como nombre, correo electrónico e historial de compras.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Client {
  id: number;
  name: string;
  email: string;
  purchaseHistory: PurchaseRecord[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number = 0,
    name: string = '',
    email: string = '',
    purchaseHistory: PurchaseRecord[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.purchaseHistory = purchaseHistory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: any): Client {
    const purchaseHistory = json.purchaseHistory ? json.purchaseHistory.map((record: any) => PurchaseRecord.fromJson(record)) : [];
    return new Client(
      json.id,
      json.name,
      json.email,
      purchaseHistory,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      purchaseHistory: this.purchaseHistory.map(record => record.toJson()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.name || this.name.trim().length === 0) {
      errors.push('El nombre del cliente es obligatorio.');
    }
    if (!this.email || !this.email.includes('@')) {
      errors.push('El correo electrónico debe ser válido.');
    }
    return { valid: errors.length === 0, errors };
  }
}

export class PurchaseRecord {
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: Date;

  constructor(
    productId: number = 0,
    productName: string = '',
    quantity: number = 0,
    totalPrice: number = 0,
    purchaseDate: Date = new Date()
  ) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.purchaseDate = purchaseDate;
  }

  static fromJson(json: any): PurchaseRecord {
    return new PurchaseRecord(
      json.productId,
      json.productName,
      json.quantity,
      json.totalPrice,
      new Date(json.purchaseDate)
    );
  }

  toJson(): any {
    return {
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      purchaseDate: this.purchaseDate.toISOString()
    };
  }
}