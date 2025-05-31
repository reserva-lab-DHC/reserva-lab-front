import { Component, input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dhc-confirm-request',
  imports: [],
  templateUrl: './confirm-request.component.html',
  styleUrl: './confirm-request.component.scss'
})
export class ConfirmRequestComponent {
  @Output() requestDestroy = new EventEmitter<void>();

  lab = input.required<string>()
  horario = input.required<string>()
  professor = input.required<string>()
  disciplina = input.required<string>()

  destroyMyself() {
    this.requestDestroy.emit();
  }
}
