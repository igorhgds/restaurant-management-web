import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableService } from '../../../core/services/table.service';
import { Table, TableLocation, TableStatus } from '../../../core/models/table.model';

@Component({
  selector: 'app-tables-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables-map.component.html',
  styleUrls: ['./tables-map.component.css']
})
export class TablesMapComponent implements OnInit {
  private tableService = inject(TableService);
  private router = inject(Router);

  tables = signal<Table[]>([]);
  selectedLocation = signal<TableLocation | 'ALL'>('ALL');

  locations: (TableLocation | 'ALL')[] = ['ALL', 'INDOOR', 'OUTDOOR', 'BALCONY', 'VIP'];

  filteredTables = computed(() => {
    const currentLoc = this.selectedLocation();
    const currentTables = this.tables();
    if (currentLoc === 'ALL') {
      return currentTables;
    }
    return currentTables.filter(t => t.location === currentLoc);
  });

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getTables().subscribe({
      next: (data) => this.tables.set(data),
      error: (err) => console.error('Failed to load tables', err)
    });
  }

  setFilter(location: TableLocation | 'ALL'): void {
    this.selectedLocation.set(location);
  }

  getTableClasses(status: TableStatus): string {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400';
      case 'OCCUPIED':
        return 'bg-red-950/60 border-red-500/50 text-red-400';
      case 'RESERVED':
        return 'bg-amber-950/60 border-amber-500/50 text-amber-400';
      case 'OUT_OF_SERVICE':
        return 'bg-gray-900 border-gray-700 text-gray-500';
      default:
        return 'bg-[#1E2026] border-[#2A2D36] text-gray-100';
    }
  }

  translateStatus(status: TableStatus): string {
    switch (status) {
      case 'AVAILABLE': return 'Livre';
      case 'OCCUPIED': return 'Ocupada';
      case 'RESERVED': return 'Reservada';
      case 'OUT_OF_SERVICE': return 'Manutenção';
      default: return status;
    }
  }

  onTableClick(table: Table): void {
    if (table.status === 'AVAILABLE') {
      this.router.navigate(['/order-create', table.id]);
    } else {
      // In a real app, maybe navigate to view existing order if OCCUPIED
      console.log('Table not available for new order');
    }
  }
}
