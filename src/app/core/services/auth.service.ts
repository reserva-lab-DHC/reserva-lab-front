import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) { }

  // Save user to localStorage
  login(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Remove user from localStorage
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Check if user exists in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Get current user
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}