import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  constructor(private http: HttpService) { }

  async cadastrarLaboratorio(lab: LaboratorioDTO): Promise<LaboratorioDTO | undefined> {
    return lastValueFrom(this.http.post<LaboratorioDTO, LaboratorioDTO>('/sala', lab));
  }
}