import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiaReserva {
  diaReserva: string;
  horarios: string[];
}

export interface ReservaDTO {
  dataReserva: string;
  diasReservados: DiaReserva[];
  status: string;
  solicitanteId: string;
  salaReservadaId: string;
  disciplinaRelacionada: string;
  motivoReserva: string;
  dataInicio: string;
  dataConclusao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/reserva';

  constructor(private http: HttpClient) {}

  enviarReserva(reserva: ReservaDTO): Observable<void> {
  // Usando 'void' pois o retorno da API não foi especificado.
  // Atualizar o tipo se o backend passar a retornar algum dado.
  return this.http.post<void>(this.apiUrl, reserva);
}
}
