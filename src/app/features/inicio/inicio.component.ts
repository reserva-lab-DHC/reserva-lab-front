import { Component, computed, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../shared/calendar/calendar/calendar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CardComponent } from '../../shared/card/card.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../quadro-de-reservas/reserva.service';
import { ReservaDTO } from '../../shared/models/reserva.dto';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';
import { defineDays, filterWeekDay } from '../quadro-de-reservas/reservas.utils';

interface SalaCard {
  nome: string;
  local: number;
  sublocal: number;
  imagem: string;
  horarios: horarioReserva;
  andar: number;
}

interface horarioReserva {
  manha?: string[]
  tarde?: string[]
  noite?: string[]
}

@Component({
  selector: 'dhc-app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  standalone: true,
  imports: [
    DropdownComponent,
    CalendarComponent,
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
  ],
})
export class InicioComponent implements OnInit {
  mostrarCalendario = signal(false);
  filtroForm!: FormGroup;

  dataSelecionada = signal<Date>(new Date());
  calendarRef = viewChild(CalendarComponent);

  router = inject(Router);
  route = inject(ActivatedRoute);

  salasDisponiveisFiltradas: SalaCard[] = [];
  salasIndisponiveisFiltradas: SalaCard[] = [];

  todasSalasDisponiveisFiltradas: SalaCard[] = [];

  isDown = false;
  startX = 0;
  scrollLeft = 0;
  dragElem: HTMLElement | null = null;

  pagAtual = 0;
  pagAtualIndisponivel = 0;

  qtdCardsPag = computed(() => (this.windowWidth() <= 768 ? 4 : 6));

  windowWidth = signal(window.innerWidth);

  reservaService = inject(ReservaService)
  salaService = inject(LaboratorioService)
  listaReservas: ReservaDTO[] = []
  listSalas: LaboratorioDTO[] = []

  horariosValidos: string[] = ["H07_40", "H09_40", "H13_00", "H15_00", "H18_20", "H20_20"]
  horariosFormatados = this.formatarHorarios()
  diaSemana = filterWeekDay(this.dataSelecionada().toLocaleDateString('pt-BR', {weekday: 'long'}))

  reservasDisponiveisFiltradas: ReservaDTO[] = []
  reservasOcupadasFiltradas: ReservaDTO[] = []
  todasSalasDisponiveis: SalaCard[] = []
  todasSalasIndisponiveis: SalaCard[] = []

  constructor() {
    effect(() => {
      this.qtdCardsPag();
      this.attPag();
      this.attPagIndisponiveis();
    });
  }

  async ngOnInit() {

    window.addEventListener('resize', () => {
      this.windowWidth.set(window.innerWidth);
    });

    this.filtroForm = new FormGroup({
      filtroTurno: new FormControl('Todos'),
      dataSelecionada: new FormControl(new Date()),
    });

    this.listaReservas = await this.reservaService.listAllReservas("ALL")
    this.listSalas = (await this.salaService.listAllLaboratorios()).filter(sala => sala.isAvailable === true)

    this.reservasDisponiveisFiltradas = this.listaReservas.filter(reserva => reserva.status !== "APROVADA")
    this.reservasOcupadasFiltradas = this.listaReservas.filter(reserva => reserva.status == "APROVADA")
    this.todasSalasDisponiveis = this.filtrarSalas(this.reservasDisponiveisFiltradas);
    this.todasSalasIndisponiveis = this.filtrarSalas(this.reservasOcupadasFiltradas)

    this.filtroForm
      .get('filtroTurno')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((turnoSelecionado: string) => {
        this.filtrarCardsPorTurno(turnoSelecionado);
      });

    this.filtroForm.get('dataSelecionada')?.valueChanges.subscribe(() => {
      console.log('Data selecionada mudou.');
    });

    this.filtrarCardsPorTurno(
      this.filtroForm.get('filtroTurno')?.value as string
    );

    this.attPagIndisponiveis();

  }


  formatarHorarios() {
    const horariosFormatados = []
    for (const horario of this.horariosValidos) {
      horariosFormatados.push(horario.replace("H", "").replace("_", ":"))
    }
    return horariosFormatados
  }
  formatarHorario(hr: string) {
    return hr.replace("H", "").replace("_", ":")
  }

  onMudancaTurno(turno: string) {
    this.diaSemana = turno
    this.filtrarCardsPorTurno(turno)
  }


  filtrarSalas(reservaList: ReservaDTO[]): SalaCard[] { // vou mudar bastante isso aq

    const salasFiltradas: SalaCard[] = []
    for (const reserva of reservaList) {
      const sala = this.listSalas.find(sala => sala.id == reserva.salaReservada!.id)

      if (!sala) continue 
      if (!reserva.diasReservados) {
        defineDays(reserva, this.horariosValidos)
      }

      const horariosReserva: horarioReserva = {}
      for (const dia of reserva.diasReservados) {
        for (const hr of dia.horarios) {
          const hrFormatado = this.formatarHorario(hr)
          const index = this.horariosFormatados.indexOf(hrFormatado)
          const slot =
            index < 2 ? 'manha' :
            index < 4 ? 'tarde' :
            'noite';
          horariosReserva[slot] = [
            ...(horariosReserva[slot] || []),
            hrFormatado
          ];
        }
      }

      const salaCard: SalaCard = {
        nome: sala.nomeSala!,
        local: sala.predio!,
        sublocal: sala.andar!,
        imagem: 'assets/img/lab_inovacao.webp',
        horarios: horariosReserva,
        andar: sala.andar!
      }
      console.log(salaCard.horarios)
      salasFiltradas.push(salaCard)
    }
    return salasFiltradas

  }

  onCardClick(sala: SalaCard) {
    const salaId = sala.nome;
    const horarios = Object.values(sala.horarios)
      .filter(Boolean)
      .flat();

    const dataSelecionadaFormatted = this.dataSelecionada().toISOString().split('T')[0]; // formato YYYY-MM-DD

    this.router.navigate(['/solicitacao-de-reservas'], {
      queryParams: {
        salaId,
        horarios: horarios.join(','),
        data: dataSelecionadaFormatted
      }
    });
  }

  attPag() {
    const inicio = this.pagAtual * this.qtdCardsPag();
    const final = inicio + this.qtdCardsPag();
    this.salasDisponiveisFiltradas = this.todasSalasDisponiveisFiltradas.slice(
      inicio,
      final
    );
  }

  proxPag() {
    const totalPags = Math.ceil(
      this.todasSalasDisponiveisFiltradas.length / this.qtdCardsPag()
    );
    if (this.pagAtual < totalPags - 1) {
      this.pagAtual++;
      this.attPag();
    }
  }

  pagAnterior() {
    if (this.pagAtual > 0) {
      this.pagAtual--;
      this.attPag();
    }
  }

  attPagIndisponiveis() {
    const inicio = this.pagAtualIndisponivel * this.qtdCardsPag();
    const final = inicio + this.qtdCardsPag();
    this.salasIndisponiveisFiltradas = this.todasSalasIndisponiveis.slice(
      inicio,
      final
    );
  }

  proxPagIndisponivel() {
    const totalPags = Math.ceil(
      this.todasSalasIndisponiveis.length / this.qtdCardsPag()
    );
    if (this.pagAtualIndisponivel < totalPags - 1) {
      this.pagAtualIndisponivel++;
      this.attPagIndisponiveis();
    }
  }

  pagAnteriorIndisponivel() {
    if (this.pagAtualIndisponivel > 0) {
      this.pagAtualIndisponivel--;
      this.attPagIndisponiveis();
    }
  }

  onDateChange(date: Date | null) {
    const dataFinal = date || new Date();
    this.dataSelecionada.set(dataFinal);
    this.filtroForm.get('dataSelecionada')?.setValue(dataFinal);
  }
  get dataFormatada(): string {
    return this.dataSelecionada().toLocaleDateString('pt-BR');
  }

  filtrarCardsPorTurno(turno: string) {
    if (turno === 'Todos') {
      this.salasDisponiveisFiltradas = this.todasSalasDisponiveis.map(
        (sala) => ({
          ...sala,  
          horarios: { manha: sala.horarios.manha || ['N/A', 'N/A'] },
        })
      );
      this.salasIndisponiveisFiltradas = this.todasSalasIndisponiveis.map(
        (sala) => ({
          ...sala,
          horarios: { noite: sala.horarios.noite || ['N/A', 'N/A'] },
        })
      );
    } else {
      this.salasDisponiveisFiltradas = this.todasSalasDisponiveis.map(
        (sala) => {
          const horarioDoTurno =
            sala.horarios[turno.toLowerCase() as keyof SalaCard['horarios']];
          return {
            ...sala,
            horarios: {
              [turno.toLowerCase()]: horarioDoTurno || ['N/A', 'N/A'],
            },
          };
        }
      );
      this.salasIndisponiveisFiltradas = this.todasSalasIndisponiveis.map(
        (sala) => {
          const horarioDoTurno =
            sala.horarios[turno.toLowerCase() as keyof SalaCard['horarios']];
          return {
            ...sala,
            horarios: { [turno.toLowerCase()]: horarioDoTurno || ['N/A', 'N/A'], },
          }
        }
      );
    }

    this.pagAtual = 0;
    this.attPag();

    this.pagAtualIndisponivel = 0;
    this.attPagIndisponiveis();
  }

  abrirCalendario() {
    this.mostrarCalendario.set(!this.mostrarCalendario());
  }

}