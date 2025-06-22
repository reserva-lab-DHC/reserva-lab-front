import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { NgIf } from '@angular/common';
import { CalendarComponent } from "../calendar/calendar/calendar.component";
import { RecentRequestComponent } from "../modals/ui/modal-recent-requests/modal-recent-requests";

@Component({
  selector: 'dhc-header-quadro',
  imports: [DropdownComponent, NgIf, CalendarComponent, RecentRequestComponent],
  templateUrl: './header-quadro.component.html',
  styleUrl: './header-quadro.component.scss'
})

export class HeaderQuadroComponent {
  showCalendar = false
  showPopup = false;
  date = new Date()

  monthday = this.date.getDate()
  month = this.date.getMonth() + 1
  weekday = this.date.toLocaleDateString('pt-BR', {weekday: 'long'})
  currentDay = `${this.monthday}/${this.month} (${this.weekday})`

  isMobile = false;
  private mediaQueryList = window.matchMedia('(max-width: 480px)');
  private listener = (event: MediaQueryListEvent) => {
    this.isMobile = event.matches;
  };
  ngOnInit(): void {
    this.isMobile = this.mediaQueryList.matches; // emit initial state
    this.mediaQueryList.addEventListener('change', this.listener); // listen to changes
  }
  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.listener);
  }

  closePopup() {
    this.showPopup = false;
  }
  nextDay() {
    this.updateDate(1)
  }
  prevDay() {

    this.updateDate(-1)
  }

  updateDate(value: number) {
    this.date.setDate(this.date.getDate() + value)
    this.monthday = this.date.getDate()
    this.month = this.date.getMonth() + 1
    this.weekday = this.date.toLocaleDateString('pt-br', {weekday: 'long'})
    this.currentDay = `${this.monthday}/${this.month} (${this.weekday})`
  }

  @Output() shiftSelected = new EventEmitter<string>();
  selected = 'todos';
    options = [
    { label: 'Matutino', value: 'matutino' },
    { label: 'Vespertino', value: 'vespertino' },
    { label: 'Noturno', value: 'noturno' },
    { label: 'Todos', value: 'todos' }
  ];
  selectShift(value: string) {
    this.selected = value;
    this.shiftSelected.emit(value);
  }

}

