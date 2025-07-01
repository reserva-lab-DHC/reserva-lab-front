import { Component, HostListener, signal, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { UserDTO } from '../../../../shared/models/user.dto';

@Component({
  selector: 'dhc-logout-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-icon.component.html',
  styleUrls: ['./logout-icon.component.scss']
})
export class LogoutIconComponent implements DoCheck {
  isLoggedIn = signal(false);
  showPopup = signal(false);
  currentUser: UserDTO | null = null;

  profileIconUrl = 'assets/img/icone-usuario.png';

  ngDoCheck(): void {
    this.checkLoginStatus();
  }

  constructor(private authService: AuthService, private router: Router) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.showPopup && !target.closest('.profile-container')) {
      this.showPopup.set(false);
    }
  }

  checkLoginStatus(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        this.currentUser = JSON.parse(userString) as UserDTO;
        this.isLoggedIn.set(true);
      } catch (e) {
        console.error('Erro ao fazer parse do currentUser do localStorage:', e);
        this.isLoggedIn.set(false);
        this.currentUser = null;
        localStorage.removeItem('currentUser');
      }
    } else {
      this.isLoggedIn.set(false);
      this.currentUser = null;
    }
  }

  togglePopup(event: Event): void {
    event.stopPropagation();
    if (this.isLoggedIn()) {
      this.showPopup.set(!this.showPopup());
    }
  }

  logout(event: Event): void {
    event.stopPropagation();
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.showPopup.set(false);
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}