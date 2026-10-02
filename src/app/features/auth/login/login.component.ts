import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          const role = this.authService.getUserRole();
          if (role === 'ADMIN' || role === 'MANAGER') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'WAITER') {
            this.router.navigate(['/waiter/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          console.error('Login error', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
