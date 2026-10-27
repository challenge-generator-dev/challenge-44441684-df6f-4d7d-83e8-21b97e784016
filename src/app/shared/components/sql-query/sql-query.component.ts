import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '@core/services/database.service';
import { Subscription } from 'rxjs';

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTime: number;
}

interface QueryPreset {
  name: string;
  description: string;
  query: string;
  type: 'select' | 'insert' | 'update' | 'delete' | 'join' | 'aggregation';
}

@Component({
  selector: 'app-sql-query',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sql-query.component.html',
  styleUrl: './sql-query.component.scss'
})
export class SqlQueryComponent implements OnInit, OnDestroy {
  currentQuery = signal('');
  queryResults = signal<QueryResult | null>(null);
  isExecuting = signal(false);
  errorMessage = signal('');
  activeTab = signal<'editor' | 'presets' | 'history'>('editor');
  queryHistory = signal<{query: string; timestamp: Date; success: boolean}[]>([]);
  selectedTable = signal<'products' | 'clients' | 'purchases'>('products');

  queryPresets: QueryPreset[] = [
    {
      name: 'Listar Productos',
      description: 'Obtiene todos los productos ordenados por nombre',
      query: 'SELECT * FROM products ORDER BY name ASC',
      type: 'select'
    },
    {
      name: 'Productos por Categoría',
      description: 'Agrupa productos por categoría con conteo',
      query: 'SELECT category, COUNT(*) as count, AVG(price) as avg_price FROM products GROUP BY category ORDER BY count DESC',
      type: 'aggregation'
    },
    {
      name: 'Clientes con Compras',
      description: 'Join entre clientes y historial de compras',
      query: `SELECT c.name, c.email, COUNT(p.id) as purchase_count, SUM(p.total) as total_spent
FROM clients c
LEFT JOIN purchases p ON c.id = p.client_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC`,
      type: 'join'
    },
    {
      name: 'Stock Bajo',
      description: 'Productos con stock menor a 10 unidades',
      query: 'SELECT name, price, stock, category FROM products WHERE stock < 10 ORDER BY stock ASC',
      type: 'select'
    },
    {
      name: 'Productos Caros',
      description: 'Productos con precio mayor al promedio',
      query: 'SELECT name, price, category FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC',
      type: 'select'
    },
    {
      name: 'Top Clientes',
      description: 'Los 5 clientes con más compras',
      query: `SELECT c.name, c.email, COUNT(p.id) as purchases, SUM(p.total) as total
FROM clients c
INNER JOIN purchases p ON c.id = p.client_id
GROUP BY c.id
ORDER BY total DESC
LIMIT 5`,
      type: 'join'
    },
    {
      name: 'Ventas por Día',
      description: 'Agrupación de ventas por fecha',
      query: `SELECT DATE(purchase_date) as date, COUNT(*) as orders, SUM(total) as daily_total
FROM purchases
GROUP BY DATE(purchase_date)
ORDER BY date DESC`,
      type: 'aggregation'
    },
    {
      name: 'Buscar Producto',
      description: 'Búsqueda por nombre con LIKE',
      query: "SELECT * FROM products WHERE name LIKE '%{{searchTerm}}%' ORDER BY name",
      type: 'select'
    }
  ];

  private subscriptions = new Subscription();

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.loadDefaultQuery();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadDefaultQuery(): void {
    const defaultPreset = this.queryPresets[0];
    this.currentQuery.set(defaultPreset.query);
  }

  selectPreset(preset: QueryPreset): void {
    this.currentQuery.set(preset.query);
    this.activeTab.set('editor');
    this.clearResults();
  }

  selectTable(table: 'products' | 'clients' | 'purchases'): void {
    this.selectedTable.set(table);
    const tableQueries: Record<string, string> = {
      products: 'SELECT * FROM products ORDER BY id DESC LIMIT 100',
      clients: 'SELECT * FROM clients ORDER BY id DESC LIMIT 100',
      purchases: 'SELECT * FROM purchases ORDER BY id DESC LIMIT 100'
    };
    this.currentQuery.set(tableQueries[table]);
    this.activeTab.set('editor');
  }

  executeQuery(): void {
    const query = this.currentQuery().trim();
    if (!query) {
      this.errorMessage.set('Por favor ingrese una consulta SQL');
      return;
    }

    this.isExecuting.set(true);
    this.clearResults();

    const startTime = performance.now();
    const sub = this.databaseService.executeQuery(query).subscribe({
      next: (results) => {
        const executionTime = performance.now() - startTime;
        const processedResults: QueryResult = {
          columns: results.length > 0 ? Object.keys(results[0]) : [],
          rows: results,
          rowCount: results.length,
          executionTime: Math.round(executionTime * 100) / 100
        };
        this.queryResults.set(processedResults);
        this.addToHistory(query, true);
        this.isExecuting.set(false);
      },
      error: (err) => {
        this.errorMessage.set(`Error en la consulta: ${err.message || 'Error desconocido'}`);
        this.addToHistory(query, false);
        this.isExecuting.set(false);
      }
    });

    this.subscriptions.add(sub);
  }

  clearQuery(): void {
    this.currentQuery.set('');
    this.clearResults();
  }

  clearResults(): void {
    this.queryResults.set(null);
    this.errorMessage.set('');
  }

  formatCellValue(value: any): string {
    if (value === null || value === undefined) {
      return 'NULL';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  getPresetIcon(type: string): string {
    const icons: Record<string, string> = {
      select: '🔍',
      insert: '➕',
      update: '✏️',
      delete: '🗑️',
      join: '🔗',
      aggregation: '📊'
    };
    return icons[type] || '📝';
  }

  private addToHistory(query: string, success: boolean): void {
    const currentHistory = this.queryHistory();
    const newEntry = {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      timestamp: new Date(),
      success
    };
    this.queryHistory.set([newEntry, ...currentHistory].slice(0, 20));
  }

  loadFromHistory(entry: { query: string }): void {
    this.currentQuery.set(entry.query);
    this.activeTab.set('editor');
  }

  getRowCountMessage(): string {
    const results = this.queryResults();
    if (!results) return '';
    return `${results.rowCount} fila${results.rowCount !== 1 ? 's' : ''} encontrada${results.rowCount !== 1 ? 's' : ''}`;
  }

  getExecutionTimeMessage(): string {
    const results = this.queryResults();
    if (!results) return '';
    return `Ejecutado en ${results.executionTime}ms`;
  }
}