import { LaboratorioDTO } from "./laboratorio.dto";
import { SolicitanteDTO } from "./solicitante.dto";

export interface DiaReserva {
  diaReserva: string;
  horarios: string[];
}

export interface ReservaDTO {
  dataReserva?: string
  diasReservados: DiaReserva[];
  status: string;
  disciplinaRelacionada: string;
  motivoReserva: string;
  dataInicio: string;
  dataConclusao: string;
  dataDaSolicitacao: string;
  salaReservada?: LaboratorioDTO;
  solicitante?: SolicitanteDTO;
  solicitanteId?: string;
  salaReservadaId?: string;
  id?: string;
}