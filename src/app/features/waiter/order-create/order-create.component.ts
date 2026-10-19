import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DishService } from '../../../core/services/dish.service';
import { OrderService } from '../../../core/services/order.service';
import { TableService } from '../../../core/services/table.service';
import { Dish, DishCategory } from '../../../core/models/dish.model';
import { OrderLineItem } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  private dishService = inject(DishService);
  private orderService = inject(OrderService);
  private tableService = inject(TableService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  tableId = signal<string>('');
  dishes = signal<Dish[]>([]);
  selectedCategory = signal<DishCategory | 'ALL'>('ALL');
  cart = signal<OrderLineItem[]>([]);
  isSubmitting = signal<boolean>(false);

  categories: (DishCategory | 'ALL')[] = ['ALL', 'BURGERS', 'DRINKS', 'SIDES', 'DESSERTS', 'SALADS'];

  filteredDishes = computed(() => {
    const currentCat = this.selectedCategory();
    const currentDishes = this.dishes();
    if (currentCat === 'ALL') {
      return currentDishes;
    }
    return currentDishes.filter(d => d.category === currentCat);
  });

  cartTotal = computed(() => {
    return this.cart().reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tableId');
    if (id) {
      this.tableId.set(id);
    } else {
      this.goBack();
    }
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe({
      next: (data) => this.dishes.set(data),
      error: (err) => console.error('Failed to load dishes', err)
    });
  }

  setCategory(category: DishCategory | 'ALL'): void {
    this.selectedCategory.set(category);
  }

  addToCart(dish: Dish): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.dishId === dish.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, {
          dishId: dish.id,
          quantity: 1,
          price: dish.price,
          dishName: dish.name
        }];
      }
    });
  }

  updateQuantity(dishId: string, delta: number): void {
    this.cart.update(currentCart => {
      return currentCart.map(item => {
        if (item.dishId === dishId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }

  removeFromCart(dishId: string): void {
    this.cart.update(currentCart => currentCart.filter(item => item.dishId !== dishId));
  }

  updateNotes(dishId: string, notes: string): void {
    this.cart.update(currentCart => {
       return currentCart.map(item => item.dishId === dishId ? { ...item, notes } : item);
    });
  }

  confirmOrder(): void {
    if (this.cart().length === 0) return;
    this.isSubmitting.set(true);

    const items = this.cart().map(item => ({
      dishId: item.dishId,
      quantity: item.quantity,
      notes: item.notes
    }));

    this.orderService.createOrder({ tableId: this.tableId(), items }).subscribe({
      next: () => {
        // Update table status to OCCUPIED after successful order creation
        this.tableService.updateTableStatus(this.tableId(), 'OCCUPIED').subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.router.navigate(['/tables-map']);
          },
          error: (err) => {
            console.error('Failed to update table status', err);
            this.isSubmitting.set(false);
            // Ideally still show success for order but error for table status
            this.router.navigate(['/tables-map']);
          }
        });
      },
      error: (err) => {
        console.error('Failed to create order', err);
        this.isSubmitting.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
