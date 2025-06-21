import { LaboratorioDTO } from "./laboratorio.dto";
import { SolicitanteDTO } from "./solicitante.dto";

/**
 * Data Transfer Object representing a reservation.
 *
 * @property dataReserva - The date of the reservation in ISO string format.
 * @property horariosReservados - An array of reserved time slots (as strings).
 * @property status - The current status of the reservation.
 * @property solicitanteId - The unique identifier of the requester.
 * @property salaReservadaId - The unique identifier of the reserved room.
 * @property disciplinaRelacionada - The related discipline or subject for the reservation.
 * @property motivoReserva - The reason or motive for the reservation.
 * @property dataSolicitacao - The date when the reservation was requested, in ISO string format.
 */
export interface ReservaDTO {
  dataReserva: string;
  horariosReservados: string[];
  status: string;
  //solicitanteId: string;
  //salaReservadaId: string;
  disciplinaRelacionada: string;
  motivoReserva: string;
  dataSolicitacao: string;
  dataConclusao: string;
  salaReservada: LaboratorioDTO;
  solicitante: SolicitanteDTO
  id: string;
}