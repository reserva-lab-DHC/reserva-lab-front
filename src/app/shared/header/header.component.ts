import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSelectComponent } from './ui/header-select.component/header-select.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dhc-header',
  standalone: true,
  imports: [CommonModule, HeaderSelectComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
}
