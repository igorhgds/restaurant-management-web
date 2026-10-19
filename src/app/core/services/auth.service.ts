import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserRole } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'auth_token';
  private userNameKey = 'user_name';

  private currentUserRoleSubject = new BehaviorSubject<UserRole | null>(this.getUserRole());
  currentUserRole$ = this.currentUserRoleSubject.asObservable();

  private currentUserNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  currentUserName$ = this.currentUserNameSubject.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.currentUserRoleSubject.next(this.getUserRole());

          // Decode token to see if name is inside it
          let nameFromToken: string | null = null;
          try {
             const decoded: any = jwtDecode(response.token);
             nameFromToken = decoded.name || decoded.fullName || decoded.username || null;
          } catch (e) {}

          // If the API returns a user object in the login response, we use that name
          // Assuming the API might return { token: '...', name: 'Igor', role: 'WAITER' } (or similar structure)
          // If not, we will extract what we can from the credentials email or sub in token
          let extractedName = nameFromToken || (response as any).name || (response as any).user?.name || (response as any).user?.fullName;

          if (!extractedName && credentials.email) {
            // fallback: extract from email "igor@email.com" -> "igor" -> "Igor"
            const namePart = credentials.email.split('@')[0];
            extractedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          }

          if (!extractedName) extractedName = 'Usuário';

          this.setUserName(extractedName);
          this.currentUserNameSubject.next(extractedName);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    this.currentUserRoleSubject.next(null);
    this.currentUserNameSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUserName(name: string): void {
    localStorage.setItem(this.userNameKey, name);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  getUserRole(): UserRole | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || (decoded.roles && decoded.roles[0]) || null;
    } catch {
      return null;
    }
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey) || 'Usuário';
  }
}
