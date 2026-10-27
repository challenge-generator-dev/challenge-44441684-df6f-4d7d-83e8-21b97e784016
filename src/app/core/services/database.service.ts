import { Injectable } from '@angular/core';
import Database from 'better-sqlite3';

export interface QueryResult {
  changes: number;
  lastInsertRowid: number;
}

export interface DatabaseConfig {
  filename: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: Database.Database | null = null;
  private readonly defaultDbPath = 'inventory.db';

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    try {
      this.db = new Database(this.defaultDbPath);
      this.db.pragma('journal_mode = WAL');
      this.createTables();
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  private createTables(): void {
    if (!this.db) throw new Error('Base de datos no inicializada');

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        price REAL NOT NULL CHECK(price >= 0),
        stock INTEGER NOT NULL CHECK(stock >= 0),
        category TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `;

    const createClientsTable = `
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        address TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `;

    const createPurchaseRecordsTable = `
      CREATE TABLE IF NOT EXISTS purchase_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL CHECK(quantity > 0),
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        purchase_date TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
      CREATE INDEX IF NOT EXISTS idx_purchase_records_client ON purchase_records(client_id);
      CREATE INDEX IF NOT EXISTS idx_purchase_records_product ON purchase_records(product_id);
    `;

    try {
      this.db.exec(createProductsTable);
      this.db.exec(createClientsTable);
      this.db.exec(createPurchaseRecordsTable);
      this.db.exec(createIndexes);
    } catch (error) {
      console.error('Error al crear las tablas:', error);
      throw error;
    }
  }

  run(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const result = stmt.run(...params);
        resolve({
          changes: result.changes,
          lastInsertRowid: Number(result.lastInsertRowid)
        });
      } catch (error) {
        console.error('Error executing SQL run:', sql, params, error);
        reject(error);
      }
    });
  }

  get<T>(sql: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const row = stmt.get(...params) as T | undefined;
        resolve(row || null);
      } catch (error) {
        console.error('Error executing SQL get:', sql, params, error);
        reject(error);
      }
    });
  }

  all<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      try {
        const stmt = this.db.prepare(sql);
        const rows = stmt.all(...params) as T[];
        resolve(rows);
      } catch (error) {
        console.error('Error executing SQL all:', sql, params, error);
        reject(error);
      }
    });
  }

  transaction<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de datos no inicializada'));
        return;
      }

      const transaction = this.db.transaction(async () => {
        return fn();
      });

      try {
        const result = transaction();
        resolve(result);
      } catch (error) {
        console.error('Error en transacción:', error);
        reject(error);
      }
    });
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Conexión a la base de datos cerrada');
    }
  }

  getDatabase(): Database.Database | null {
    return this.db;
  }
}