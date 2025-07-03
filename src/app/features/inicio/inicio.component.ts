import { Component, computed, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../shared/calendar/calendar/calendar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CardComponent } from '../../shared/card/card.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';

interface SalaCard {
  nome: string;
  local: string;
  sublocal: string;
  imagem: string;
  horarios: {
    manha?: string[];
    tarde?: string[];
    noite?: string[];
  };
  andar: number;
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

  constructor() {
    effect(() => {
      this.qtdCardsPag();
      this.attPag();
      this.attPagIndisponiveis();
    });
  }

  ngOnInit() {

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

    this.attPagIndisponiveis();
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
      this.todasSalasDisponiveisFiltradas = this.todasSalasDisponiveis.map(
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
      this.todasSalasDisponiveisFiltradas = this.todasSalasDisponiveis.map(
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
        (sala) => ({
          ...sala,
          horarios: { noite: sala.horarios.noite || ['N/A', 'N/A'] },
        })
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

  todasSalasDisponiveis: SalaCard[] = [
    {
      nome: 'Laboratório Tecnológico I',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['07:40', '09:40'],
        tarde: ['13:00', '15:00'],
        noite: ['18:20', '20:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Exemplo I',
      local: 'Prédio II',
      sublocal: 'S3 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00'],
        tarde: ['14:40', '16:40'],
        noite: ['20:00'],
      },
      andar: Math.floor(Math.random() * 6) + 1, // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio II',
      sublocal: 'Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['10:00'],
        tarde: ['13:00'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 6) + 1, // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório de Química',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['07:40'],
        tarde: ['15:00'],
        noite: ['20:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Metodologias Ativas II',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        manha: ['08:00', '10:00'],
        tarde: ['14:40'],
        noite: ['18:20', '20:00'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Inovação',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['09:40'],
        tarde: ['13:00', '15:00'],
        noite: ['20:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Maquetaria',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['07:40'],
        tarde: ['14:40'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Robótica',
      local: 'Prédio II',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00'],
        tarde: ['16:40'],
        noite: ['20:00'],
      },
      andar: Math.floor(Math.random() * 6) + 1, // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo III',
      local: 'Prédio I',
      sublocal: 'S1 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['10:00'],
        tarde: ['13:00'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo IV',
      local: 'Prédio I',
      sublocal: 'Térreo',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        manha: ['09:40'],
        tarde: ['15:00'],
        noite: ['20:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo V',
      local: 'Prédio II',
      sublocal: '2º Andar',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['07:40'],
        tarde: ['14:40'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 6) + 1, // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo VI',
      local: 'Prédio IV',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['08:00'],
        tarde: ['16:40'],
        noite: ['20:00'],
      },
      andar: Math.floor(Math.random() * 4) + 1, // 1-4 para Prédio IV
    },
    {
      nome: 'Laboratório Exemplo VII',
      local: 'Prédio I',
      sublocal: 'Subsolo',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['10:00'],
        tarde: ['13:00'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1, // 1-11 para Prédio I
    },
  ];

  todasSalasIndisponiveis: SalaCard[] = [
    {
      nome: 'Laboratório Exemplo',
      local: 'Prédio I',
      sublocal: 'Metodologias Ativas II',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['07:40'],
        tarde: ['13:00'],
        noite: ['20:00'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
    {
      nome: 'Laboratório Tecnológico III',
      local: 'Prédio I',
      sublocal: 'Biblioteca',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['10:00'],
        tarde: ['15:00'],
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        tarde: ['16:40'],
        noite: ['20:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: '[subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00'],
        noite: ['22:00'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
    {
      nome: 'Laboratório de Física',
      local: 'Prédio II',
      sublocal: '2º Andar',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        tarde: ['14:40'],
        noite: ['20:00'],
      },
      andar: Math.floor(Math.random() * 6) + 1,
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: 'Térreo',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['09:40'],
        tarde: ['13:00'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
    {
      nome: 'Laboratório Exemplo III',
      local: 'Prédio I',
      sublocal: 'Subsolo',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        noite: ['18:20'],
      },
      andar: Math.floor(Math.random() * 11) + 1,
    },
  ];
}
