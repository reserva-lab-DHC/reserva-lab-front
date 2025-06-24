import { Component, input, Output, EventEmitter } from '@angular/core'; 
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';


export type Mode = 'range' | 'multiple' | 'single';

@Component({
  selector: 'dhc-calendar',
  
  standalone: true, // Provavelmente precisa disso
  imports: [ CalendarModule, FormsModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  dates: Date[] = []; // Se 'dates' não for mais usado para seleção 'single', você pode remover ou ajustar.

  
  selectedDate: Date | null = null; // Para o modo 'single'. Defina como 'null' inicialmente.

  
  selectionMode = input<Mode>('single');

  
  @Output() dateSelected = new EventEmitter<Date>(); // Ou EventEmitter<Date[]> se for 'range'/'multiple'

  
  onDateChange(event:Date | null ) { // Ou 'event: Date' se tiver certeza que é sempre uma única data


    // Acessando o valor do input 'selectionMode' usando selectionMode()
    if (this.selectionMode() === 'single') {
      this.selectedDate = event; // A PrimeNG retorna a data diretamente
      if (this.selectedDate) { // Garante que a data não seja nula antes de emitir
        this.dateSelected.emit(this.selectedDate); // Emite a data selecionada para o componente pai
      }
    } else if (this.selectionMode() === 'range' || this.selectionMode() === 'multiple') {
      
      console.warn('Modo de seleção diferente de "single" ainda não implementado completamente para o emit do calendário.');
      // Exemplo se fosse 'range' ou 'multiple' e 'selectedDate' fosse Date[]
      // this.selectedDate = event as Date[];
      // this.dateSelected.emit(this.selectedDate);
    }
  }
}