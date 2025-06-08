import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Reserva {
 
  responsavel: string;
  disciplina: string;
  descricao: string;
  repetir: string;
  horarios: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  enviarReserva(reserva: Reserva): Observable<{ success: boolean }> {
    console.log('Enviando reserva para o backend:', reserva);
    // Simular resposta de sucesso após 1 segundo
    return of({ success: true });
  }
}