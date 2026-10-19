import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Table, TableStatus } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tables`;

  getTables(): Observable<Table[]> {
    // Handling case where backend returns a paginated Pageable object (Spring Boot default)
    // or an unwrapped array.
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response && response.content && Array.isArray(response.content)) {
          return response.content as Table[];
        }
        return (response || []) as Table[];
      })
    );
  }

  updateTableStatus(id: string, status: TableStatus): Observable<Table> {
    return this.http.patch<Table>(`${this.apiUrl}/${id}/status`, { status });
  }
}
