import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmRequestComponent } from "../../../confirm-request/confirm-request.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'dhc-modal-recent-requests',
  imports: [ConfirmRequestComponent, NgIf],
  templateUrl: './modal-recent-requests.html',
  styleUrl: './modal-recent-requests.scss'
})

export class RecentRequestComponent {

  visible = [true, true, true]

  @Output() closePopup = new EventEmitter<void>();

  
  onClose() {
    this.closePopup.emit();
  }

}