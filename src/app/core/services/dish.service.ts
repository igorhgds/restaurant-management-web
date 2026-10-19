import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/dishes`;

  getDishes(): Observable<Dish[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response && response.content && Array.isArray(response.content)) {
          return response.content as Dish[];
        }
        return (response || []) as Dish[];
      })
    );
  }
}
