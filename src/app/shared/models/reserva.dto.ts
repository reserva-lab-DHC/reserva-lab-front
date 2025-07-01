import { LaboratorioDTO } from "./laboratorio.dto";
import { SolicitanteDTO } from "./solicitante.dto";

/**
 * Data Transfer Object representing a reservation.
 *
 * @property dataReserva - The date of the reservation in ISO string format.
 * @property diasReservados - An array of reserved days, each with its own time slots.
 * @property status - The current status of the reservation.
 * @property solicitanteId - The unique identifier of the requester.
 * @property salaReservadaId - The unique identifier of the reserved room.
 * @property disciplinaRelacionada - The related discipline or subject for the reservation.
 * @property motivoReserva - The reason or motive for the reservation.
 * @property dataInicio - The start date of the reservation in ISO string format.
 * @property dataConclusao - The end date of the reservation in ISO string format.
 */
export interface DiaReserva {
  diaReserva: string;
  horarios: string[];
}

export interface ReservaDTO {
  uuid: string;
  dataReserva: string;
  diasReservados: DiaReserva[];
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