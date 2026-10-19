import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Table, TableStatus } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tables`;

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl);
  }

  updateTableStatus(id: string, status: TableStatus): Observable<Table> {
    return this.http.patch<Table>(`${this.apiUrl}/${id}/status`, { status });
  }
}
