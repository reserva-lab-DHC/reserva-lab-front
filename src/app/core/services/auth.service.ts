import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../../shared/models/user.dto';
import { HttpService } from './http.service';
import { lastValueFrom } from 'rxjs';

export interface AuthDTO {
  username: string;
  rawPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, private httpService: HttpService) { }

  // Save user to localStorage
  async login(user: AuthDTO): Promise<void> {
    const currentUser = await lastValueFrom(
      this.httpService.post<UserDTO, AuthDTO>('/api/auth/verify', user)
    );
    
    if (typeof currentUser === 'string') {
      localStorage.setItem('currentUser', currentUser);
    } else {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    this.router.navigate(['/inicio']);
  }

  // Remove user from localStorage
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  async register(user: UserDTO): Promise<UserDTO> {
    return await lastValueFrom(this.httpService.post<UserDTO, UserDTO>('/users', user));
  }

  // Check if user exists in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Get current user
  getCurrentUser(): object | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string {
    const user = this.getCurrentUser();
    return user ? (user as UserDTO).id || '' : '';
  }
}