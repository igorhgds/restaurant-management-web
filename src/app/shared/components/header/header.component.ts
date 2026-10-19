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

  userName = 'João'; // This should ideally come from auth token, hardcoding as per issue description for now or could be extracted if token structure was known. Let's provide a fallback.
  userRole$ = this.authService.currentUserRole$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
