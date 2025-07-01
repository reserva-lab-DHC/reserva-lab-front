import { Injectable } from '@angular/core';
import { lastValueFrom  } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { ReservaDTO } from '../../shared/models/reserva.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpService) { }

  async solicitarReserva(reserva: ReservaDTO): Promise<ReservaDTO> {
    return lastValueFrom(this.http.post<ReservaDTO, ReservaDTO>('/reserva', reserva));
  }
  async editReserva(reserva: ReservaDTO, id: string): Promise<ReservaDTO | undefined> { 
  return lastValueFrom(this.http.put<ReservaDTO, ReservaDTO>(`/reserva/${id}`, reserva));
}

 async deleteReserva(id: string): Promise<ReservaDTO | undefined> { 
  return lastValueFrom(this.http.delete<ReservaDTO>(`/reserva/${id}`));
 }
}