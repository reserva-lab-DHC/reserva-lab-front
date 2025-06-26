import { LaboratorioDTO } from "./laboratorio.dto";
import { SolicitanteDTO } from "./solicitante.dto";

export interface ReservaDTO {
  dataReserva: string;
  diasReservados: [
    {
      diaReserva: string,
      horarios: string[];
    }
  ]
  status: string;
  disciplinaRelacionada: string;
  motivoReserva: string;
  dataInicio: string;
  dataConclusao: string;
  dataDaSoclitacao: string;
  salaReservada: LaboratorioDTO;
  solicitante: SolicitanteDTO
  id: string;
}