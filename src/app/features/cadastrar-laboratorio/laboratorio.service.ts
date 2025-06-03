import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratorioDTO } from './laboratorio.dto'; 

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private baseUrl = 'http://localhost:8080'; // Posteriormente vai ter alteração

  constructor(private http: HttpClient) {}

  cadastrarLaboratorio(lab: LaboratorioDTO): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/sala`, lab);
  }
}
