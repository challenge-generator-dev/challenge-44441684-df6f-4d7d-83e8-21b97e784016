import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService } from '@core/services/client.service';
import { Client } from '@core/models/client.model';
import { SqlQueryComponent } from '@shared/components/sql-query/sql-query.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SqlQueryComponent],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientService);

  clients = signal<Client[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  lastQueryExecuted = signal<string>('');

  clientCount = computed(() => this.clients().length);

  hasClients = computed(() => this.clients().length > 0);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.getAllClients().subscribe({
      next: (clients: Client[]) => {
        this.clients.set(clients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY name ASC');
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar clientes: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  deleteClient(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        const updatedClients = this.clients().filter(c => c.id !== id);
        this.clients.set(updatedClients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set(`DELETE FROM clients WHERE id = ${id}`);
      },
      error: (err) => {
        this.errorMessage.set('Error al eliminar cliente: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  searchClients(term: string): void {
    if (!term.trim()) {
      this.loadClients();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.clientService.searchClients(term).subscribe({
      next: (clients: Client[]) => {
        this.clients.set(clients);
        this.isLoading.set(false);
        this.lastQueryExecuted.set(`SELECT * FROM clients WHERE name LIKE '%${term}%' OR email LIKE '%${term}%'`);
      },
      error: (err) => {
        this.errorMessage.set('Error en la búsqueda: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

  sortByName(): void {
    const sorted = [...this.clients()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.clients.set(sorted);
    this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY name ASC');
  }

  sortByEmail(): void {
    const sorted = [...this.clients()].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    this.clients.set(sorted);
    this.lastQueryExecuted.set('SELECT * FROM clients ORDER BY email ASC');
  }

  getPurchaseCount(client: Client): number {
    return client.purchaseHistory?.length || 0;
  }
}