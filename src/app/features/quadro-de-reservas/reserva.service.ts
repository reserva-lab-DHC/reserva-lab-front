import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ReservaDTO } from '../../shared/models/reserva.dto';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpService) { }


  async listReservaBySala(uuid: string, status: string): Promise<ReservaDTO[]> {
    return lastValueFrom(this.http.get<ReservaDTO[]>(`/reserva/${uuid}/${status}`));
  }

  async cadastrarReserva(reserva: ReservaDTO): Promise<ReservaDTO | undefined> {
    return lastValueFrom(this.http.post<ReservaDTO, ReservaDTO>('/reserva', reserva));
  }

  async editReserva(reserva: ReservaDTO, uuid: string,): Promise<ReservaDTO | undefined> {
    return lastValueFrom(this.http.put<ReservaDTO, ReservaDTO>(`/reserva/${uuid}`, reserva));
  }

  async deleteReserva(uuid: string): Promise<ReservaDTO | undefined> {
    return lastValueFrom(this.http.delete<ReservaDTO>(`/reserva/${uuid}`));
  }

  async listAllReservas(status: string): Promise<ReservaDTO[]> {
    return lastValueFrom(this.http.get<ReservaDTO[]>(`/reserva/list/${status}`))
  }

}