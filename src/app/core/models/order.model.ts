export type OrderStatus = 'OPEN' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CLOSED' | 'CANCELED';

export interface OrderLineItem {
  dishId: string;
  quantity: number;
  price: number;
  notes?: string;
  dishName?: string; // Optional for UI display purposes
}

export interface Order {
  id: string;
  tableId: string;
  status: OrderStatus;
  items: OrderLineItem[];
  total: number;
  createdAt: string;
}

export interface CreateOrderRequest {
  tableId: string;
  items: { dishId: string; quantity: number; notes?: string }[];
}
