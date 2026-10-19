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
          this.currentUserNameSubject.next(this.getUserName());
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserRoleSubject.next(null);
    this.currentUserNameSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
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
      // Assuming role is stored in 'role' or 'roles' claim
      return decoded.role || (decoded.roles && decoded.roles[0]) || null;
    } catch {
      return null;
    }
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Standard JWT claims: 'sub' (subject, usually email/username) or 'name' (full name)
      // Attempting to retrieve a name property first, fallback to sub, fallback to 'Usuário'
      return decoded.name || decoded.sub || 'Usuário';
    } catch {
      return null;
    }
  }
}
