import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '@app/core/services/product.service';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = signal(false);
  productId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isCheckingName = signal(false);
  nameExists = signal(false);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required, Validators.maxLength(50)]]
    });

    effect(() => {
      const name = this.productForm.get('name')?.value;
      const currentId = this.productId();
      if (name && name.length >= 3 && !this.isCheckingName()) {
        this.checkNameAvailability(name, currentId);
      }
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.productId.set(id);
        this.isEditMode.set(true);
        this.loadProduct(id);
      }
    }
  }

  loadProduct(id: number): void {
    this.isLoading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category
          });
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar el producto');
        this.isLoading.set(false);
        console.error('Error loading product:', err);
      }
    });
  }

  checkNameAvailability(name: string, excludeId?: number): void {
    this.isCheckingName.set(true);
    this.productService.productNameExists(name, excludeId ?? undefined).subscribe({
      next: (exists) => {
        this.nameExists.set(exists);
        if (exists) {
          this.productForm.get('name')?.setErrors({ nameExists: true });
        }
        this.isCheckingName.set(false);
      },
      error: () => {
        this.isCheckingName.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const formValue = this.productForm.value;
    const product = new Product(
      formValue.id ?? 0,
      formValue.name,
      parseFloat(formValue.price),
      parseInt(formValue.stock, 10),
      formValue.category
    );

    const operation = this.isEditMode()
      ? this.productService.updateProduct(product)
      : this.productService.createProduct(product);

    operation.subscribe({
      next: (savedProduct) => {
        this.successMessage.set(
          this.isEditMode()
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        );
        this.isLoading.set(false);
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage.set(
          this.isEditMode()
            ? 'Error al actualizar el producto'
            : 'Error al crear el producto'
        );
        this.isLoading.set(false);
        console.error('Error saving product:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  get nameControl() {
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get stockControl() {
    return this.productForm.get('stock');
  }

  get categoryControl() {
    return this.productForm.get('category');
  }
}