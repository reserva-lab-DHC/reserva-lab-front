import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dhc-confirm-request',
  imports: [],
  templateUrl: './confirm-request.component.html',
  styleUrl: './confirm-request.component.scss'
})
export class ConfirmRequestComponent {
  @Output() requestDestroy = new EventEmitter<void>();

  @Input() lab = ""
  @Input() horario = ""
  @Input() professor = ""
  @Input() disciplina = ""

  destroyMyself() {
    this.requestDestroy.emit();
  }
}
