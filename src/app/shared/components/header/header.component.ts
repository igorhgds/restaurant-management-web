import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName$ = this.authService.currentUserName$;
  userRole$ = this.authService.currentUserRole$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
