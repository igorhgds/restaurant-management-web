import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderCreateComponent } from './order-create.component';
import { DishService } from '../../../core/services/dish.service';
import { OrderService } from '../../../core/services/order.service';
import { TableService } from '../../../core/services/table.service';

describe('OrderCreateComponent', () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCreateComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [DishService, OrderService, TableService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
