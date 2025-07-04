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
import { defineDays, filterOngoingReservas, filterWeekDay } from '../quadro-de-reservas/reservas.utils';
import { FotosPorNumero } from '../../shared/models/fotos.enum';

interface SalaCard {
  nome: string;
  local: number;
  sublocal: number;
  image: string;
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
  diaSemanaHoje = filterWeekDay(this.dataSelecionada().toLocaleDateString('pt-BR', {weekday: 'long'}))

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


    this.listaReservas = await this.reservaService.listAllReservas("ALL")
    this.listSalas = (await this.salaService.listAllLaboratorios())
    const filtr = this.filtrarSalas()
    this.todasSalasDisponiveis = filtr[0]
    this.todasSalasIndisponiveis = filtr[1]
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

  onMudancaTurno(turno: 'matutino' | 'vespertino' | 'noturno' | 'todos') {
    const filtr = this.filtrarSalas(turno)
    this.todasSalasDisponiveis = filtr[0]
    this.todasSalasIndisponiveis = filtr[1]
    this.filtrarCardsPorTurno(turno)
  }

  filtrarSalas(turno: 'matutino' | 'vespertino' | 'noturno' | 'todos' = 'todos') {
    const reservasAtivas = filterOngoingReservas(this.listaReservas, this.dataSelecionada()); // reservas no dia selecionado
    const salasDisponiveis: SalaCard[] = [];
    const salasIndisponiveis: SalaCard[] = [];
    for (const reserva of reservasAtivas) {
      const sala = reserva.salaReservada!;
      const horariosBase = new Set(this.filtrarPorTurno(turno));
      defineDays(reserva, [...horariosBase]) // para teste, já que os valores são null
      for (const dia of reserva.diasReservados) {
        if (dia.diaReserva !== this.diaSemanaHoje) {
          console.log("não é o dia atual")
          continue
        }

        // se um dos horarios estiver reservado, exclui dos horariosDisponiveis
        const horariosDisponiveis = new Set(horariosBase);
        dia.horarios.forEach(hr => horariosDisponiveis.delete(hr)); 

        const horariosReserva: horarioReserva = {}; // horarios para manha, tarde, noite
        for (const hr of horariosDisponiveis) {
          const hrFormatado = this.formatarHorario(hr);
          const index = this.horariosFormatados.indexOf(hrFormatado);
          const slot = index < 2 ? 'manha' : index < 4 ? 'tarde' : 'noite';
          horariosReserva[slot] = [...(horariosReserva[slot] || []), hrFormatado];
        }

        const salaCard: SalaCard = {
          nome: sala.nomeSala!,
          local: sala.predio!,
          sublocal: sala.andar!,
          image: FotosPorNumero[sala.image!],
          andar: sala.andar!,
          horarios: horariosReserva,
        };

        (horariosDisponiveis.size > 0 ? salasDisponiveis : salasIndisponiveis).push(salaCard);
      }
    }

    // TODO: tem q fazer uma lógica para todas as salas que estejam livre de reservas
    console.log(salasDisponiveis)
    console.log(salasIndisponiveis)
    this.salasDisponiveisFiltradas = salasDisponiveis;
    this.salasIndisponiveisFiltradas = salasIndisponiveis;
    return [salasDisponiveis, salasIndisponiveis]
  }
  getTurno(index: number): 'manha' | 'tarde' | 'noite' {
    return index < 2 ? 'manha' : index < 4 ? 'tarde' : 'noite';
  }


  turnos = {
    matutino: [0, 2],
    vespertino: [2, 4],
    noturno: [4, 6],
    todos: [0, 6]
  };
  filtrarPorTurno(turno: 'matutino' | 'vespertino' | 'noturno' | 'todos') {
    const [start, end] = this.turnos[turno];
    return this.horariosValidos.slice(start, end);
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