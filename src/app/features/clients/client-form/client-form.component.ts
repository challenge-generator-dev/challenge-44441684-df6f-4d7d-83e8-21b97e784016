import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientService } from '@app/core/services/client.service';
import { Client, PurchaseRecord } from '@app/core/models/client.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = signal(false);
  clientId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isCheckingEmail = signal(false);
  emailExists = signal(false);
  purchaseHistory = signal<PurchaseRecord[]>([]);

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ], [this.emailValidator.bind(this)]],
      phone: ['', [
        Validators.pattern(/^\d{10,15}$/)
      ]],
      address: ['', [Validators.maxLength(200)]]
    });
  }

  emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) {
      return of(null);
    }

    this.isCheckingEmail.set(true);
    return new Observable(observer => {
      this.clientService.emailExists(email, this.clientId() ?? undefined).subscribe({
        next: (exists) => {
          this.emailExists.set(exists);
          this.isCheckingEmail.set(false);
          if (exists) {
            observer.next({ emailExists: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: () => {
          this.isCheckingEmail.set(false);
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.clientId.set(id);
        this.isEditMode.set(true);
        this.loadClient(id);
      }
    }
  }

  loadClient(id: number): void {
    this.isLoading.set(true);
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        if (client) {
          this.clientForm.patchValue({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone || '',
            address: client.address || ''
          });
          if (client.purchaseHistory) {
            this.purchaseHistory.set(client.purchaseHistory);
          }
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar el cliente');
        this.isLoading.set(false);
        console.error('Error loading client:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const formValue = this.clientForm.value;
    const client = new Client(
      formValue.id ?? 0,
      formValue.name,
      formValue.email,
      formValue.phone || null,
      formValue.address || null
    );

    const operation = this.isEditMode()
      ? this.clientService.updateClient(client)
      : this.clientService.createClient(client);

    operation.subscribe({
      next: (savedClient) => {
        this.successMessage.set(
          this.isEditMode()
            ? 'Cliente actualizado correctamente'
            : 'Cliente creado correctamente'
        );
        this.isLoading.set(false);
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage.set(
          this.isEditMode()
            ? 'Error al actualizar el cliente'
            : 'Error al crear el cliente'
        );
        this.isLoading.set(false);
        console.error('Error saving client:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }

  get nameControl() {
    return this.clientForm.get('name');
  }

  get emailControl() {
    return this.clientForm.get('email');
  }

  get phoneControl() {
    return this.clientForm.get('phone');
  }

  get addressControl() {
    return this.clientForm.get('address');
  }

  getTotalPurchases(): number {
    return this.purchaseHistory().reduce((sum, record) => sum + record.amount, 0);
  }

  getPurchaseCount(): number {
    return this.purchaseHistory().length;
  }
}