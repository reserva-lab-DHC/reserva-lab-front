import { ReservaDTO } from "../../shared/models/reserva.dto";

	function isReservaOngoing(start: string, end: string, selected: string): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const selectedDate = new Date(selected);
    return startDate < selectedDate && selectedDate < endDate;
  }

  export function filterOngoingReservas(reservaList: ReservaDTO[], currentDate: Date) {
    reservaList = reservaList.filter(reserva => {
      const isExpired = isReservaOngoing(reserva.dataInicio, reserva.dataConclusao, currentDate.toISOString());
      //if (isExpired) this.reservaService.deleteReserva(reserva.id); // TODO: notificar o usuário que sua reserva expirou
      return !isExpired;
    });
		return reservaList
  }

	export function filterWeekDay(weekday: string) {
    return weekday.substring(0, 3).replace("sáb", "sab").replace(".", "").toUpperCase()
  }


  // MÉTODOS PARA TESTE

  export function defineDays(reserva: ReservaDTO, schedulesList: string[]) {
    if (reserva.diasReservados == null) {
      reserva.diasReservados = [{
        diaReserva: "QUA",
        horarios: generateRandomSchedules(schedulesList) // ["H07_40", "H13_00"]
      }]
    }
  }

  function generateRandomSchedules(schedulesList: string[]) {
    const shuffled = [...schedulesList]; // clone to avoid mutation
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // shuffle
    }
    const schedules = shuffled.slice(0, 2); // get 2 unique values
    return schedules
  }

