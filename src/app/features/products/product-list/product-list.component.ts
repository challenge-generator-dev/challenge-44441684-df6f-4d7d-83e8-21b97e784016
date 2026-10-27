import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  selectedCategory = signal<string>('');
  sortField = signal<'name' | 'price' | 'stock'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  categories = computed(() => {
    const cats = new Set<string>();
    this.products().forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  });

  filteredProducts = computed(() => {
    let result = this.products();
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(p => p.category === category);
    }
    const field = this.sortField();
    const direction = this.sortDirection();
    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
      }
      return direction === 'asc' ? comparison : -comparison;
    });
    return result;
  });

  totalValue = computed(() => {
    return this.filteredProducts().reduce((sum, p) => sum + (p.price * p.stock), 0);
  });

  totalProducts = computed(() => this.filteredProducts().length);

  lowStockCount = computed(() => this.filteredProducts().filter(p => p.stock < 10).length);

  constructor(private productServ: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al cargar los productos. Intenta de nuevo.');
        this.isLoading.set(false);
        console.error('Error cargando productos:', err);
      }
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }
    this.isLoading.set(true);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(products => products.filter(p => p.id !== id));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Error al eliminar el producto.');
        this.isLoading.set(false);
        console.error('Error eliminando producto:', err);
      }
    });
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  clearCategory(): void {
    this.selectedCategory.set('');
  }

  toggleSort(field: 'name' | 'price' | 'stock'): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: string): string {
    if (this.sortField() !== field) return '';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }

  refreshData(): void {
    this.loadProducts();
  }
}