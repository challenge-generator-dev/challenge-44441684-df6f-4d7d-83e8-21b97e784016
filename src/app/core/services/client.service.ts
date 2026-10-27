import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { Client, PurchaseRecord } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private databaseService: DatabaseService) {}

  createClient(client: Client): Observable<Client> {
    const validation = client.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const emailExists = this.clientEmailExistsSync(client.email, client.id);
    if (emailExists) {
      throw new Error(`El correo electrónico '${client.email}' ya está registrado`);
    }

    const sql = `
      INSERT INTO clients (name, email, phone, address, created_at, updated_at)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    const params = [client.name, client.email, client.phone || null, client.address || null];
    return from(this.databaseService.run(sql, params)).pipe(
      map(() => client),
      catchError(error => {
        console.error('Error creating client:', error);
        throw new Error(`No se pudo crear el cliente: ${error.message}`);
      })
    );
  }

  getAllClients(): Observable<Client[]> {
    const sql = 'SELECT * FROM clients ORDER BY name ASC';
    return from(this.databaseService.all<any>(sql)).pipe(
      map(rows => rows.map(row => Client.fromJson(row))),
      catchError(error => {
        console.error('Error fetching clients:', error);
        throw new Error(`No se pudieron obtener los clientes: ${error.message}`);
      })
    );
  }

  getClientById(id: number): Observable<Client | null> {
    const sql = 'SELECT * FROM clients WHERE id = ?';
    return from(this.databaseService.get<any>(sql, [id])).pipe(
      map(row => row ? Client.fromJson(row) : null),
      catchError(error => {
        console.error('Error fetching client by id:', error);
        throw new Error(`No se pudo obtener el cliente: ${error.message}`);
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    const validation = client.validate();
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const existingClient = this.getClientByIdSync(client.id);
    if (!existingClient) {
      throw new Error(`El cliente con ID ${client.id} no existe`);
    }

    const emailExists = this.clientEmailExistsSync(client.email, client.id);
    if (emailExists) {
      throw new Error(`El correo electrónico '${client.email}' ya está registrado`);
    }

    const sql = `
      UPDATE clients
      SET name = ?, email = ?, phone = ?, address = ?, updated_at = datetime('now')
      WHERE id = ?
    `;

    const params = [client.name, client.email, client.phone || null, client.address || null, client.id];
    return from(this.databaseService.run(sql, params)).pipe(
      map(() => client),
      catchError(error => {
        console.error('Error updating client:', error);
        throw new Error(`No se pudo actualizar el cliente: ${error.message}`);
      })
    );
  }

  deleteClient(id: number): Observable<void> {
    const existingClient = this.getClientByIdSync(id);
    if (!existingClient) {
      throw new Error(`El cliente con ID ${id} no existe`);
    }

    const sql = 'DELETE FROM clients WHERE id = ?';
    return from(this.databaseService.run(sql, [id])).pipe(
      map(() => undefined),
      catchError(error => {
        console.error('Error deleting client:', error);
        throw new Error(`No se pudo eliminar el cliente: ${error.message}`);
      })
    );
  }

  clientEmailExists(email: string, excludeId?: number): Observable<boolean> {
    return of(this.clientEmailExistsSync(email, excludeId));
  }

  private clientEmailExistsSync(email: string, excludeId?: number): boolean {
    let sql = 'SELECT COUNT(*) as count FROM clients WHERE email = ?';
    const params: any[] = [email];

    if (excludeId !== undefined) {
      sql += ' AND id != ?';
      params.push(excludeId);
    }

    try {
      const result = this.databaseService.get<{ count: number }>(sql, params);
      return result ? result.count > 0 : false;
    } catch {
      return false;
    }
  }

  private getClientByIdSync(id: number): Client | null {
    try {
      const sql = 'SELECT * FROM clients WHERE id = ?';
      const row = this.databaseService.get<any>(sql, [id]);
      return row ? Client.fromJson(row) : null;
    } catch {
      return null;
    }
  }

  getClientPurchaseHistory(clientId: number): Observable<PurchaseRecord[]> {
    const sql = `
      SELECT pr.*, p.name as product_name, p.price as product_price
      FROM purchase_records pr
      JOIN products p ON pr.product_id = p.id
      WHERE pr.client_id = ?
      ORDER BY pr.purchase_date DESC
    `;

    return from(this.databaseService.all<any>(sql, [clientId])).pipe(
      map(rows => rows.map(row => PurchaseRecord.fromJson(row))),
      catchError(error => {
        console.error('Error fetching purchase history:', error);
        throw new Error(`No se pudo obtener el historial de compras: ${error.message}`);
      })
    );
  }

  getClientsWithPurchases(): Observable<any[]> {
    const sql = `
      SELECT c.*, COUNT(pr.id) as purchase_count, SUM(pr.quantity * pr.unit_price) as total_spent
      FROM clients c
      LEFT JOIN purchase_records pr ON c.id = pr.client_id
      GROUP BY c.id
      ORDER BY total_spent DESC
    `;

    return from(this.databaseService.all<any>(sql)).pipe(
      map(rows => rows.map(row => ({
        ...Client.fromJson(row),
        purchaseCount: row.purchase_count,
        totalSpent: row.total_spent || 0
      }))),
      catchError(error => {
        console.error('Error fetching clients with purchases:', error);
        throw new Error(`No se pudieron obtener los clientes con compras: ${error.message}`);
      })
    );
  }
}