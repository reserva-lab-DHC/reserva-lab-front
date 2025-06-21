import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(private http: HttpService) { }

  async listAllSala(): Promise<LaboratorioDTO[]> {
    return lastValueFrom(this.http.get<LaboratorioDTO[]>(`/sala`))
  }

  async getSalaById(uuid: string): Promise<LaboratorioDTO> {
    return lastValueFrom(this.http.get<LaboratorioDTO>(`/sala/${uuid}`))
  }

}