import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tables-map',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'tables',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'dishes',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'menus',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'kitchen',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'tables-map',
        loadComponent: () => import('./features/waiter/tables-map/tables-map.component').then(m => m.TablesMapComponent)
      },
      {
        path: 'order-create/:tableId',
        loadComponent: () => import('./features/waiter/order-create/order-create.component').then(m => m.OrderCreateComponent)
      },
      {
        path: 'my-orders',
        loadComponent: () => import('./shared/components/placeholder/placeholder.component').then(m => m.PlaceholderComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
