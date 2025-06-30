import { Component, OnInit, signal, viewChild } from '@angular/core';
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../shared/calendar/calendar/calendar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CardComponent } from "../../shared/card/card.component";


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
    InputSelectComponent,
    CalendarComponent,
    CommonModule,
    ReactiveFormsModule,
    CardComponent
  ]
})
export class InicioComponent implements OnInit {
  mostrarCalendario = signal(false);
  filtroForm!: FormGroup;

  dataSelecionada = signal<Date>(new Date());
  calendarRef = viewChild(CalendarComponent);

  salasDisponiveisFiltradas: SalaCard[] = [];
  salasIndisponiveisFiltradas: SalaCard[] = [];

  isDown = false;
  startX = 0;
  scrollLeft = 0;
  dragElem: HTMLElement | null = null;

  ngOnInit() {
    this.filtroForm = new FormGroup({
      filtroTurno: new FormControl('Todos'),
      dataSelecionada: new FormControl(new Date())
    });

    this.filtroForm.get('filtroTurno')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((turnoSelecionado: string) => {
        this.filtrarCardsPorTurno(turnoSelecionado);
      });

    this.filtroForm.get('dataSelecionada')?.valueChanges.subscribe(() => {
      console.log('Data selecionada mudou.');
    });

    this.filtrarCardsPorTurno(this.filtroForm.get('filtroTurno')?.value as string);

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
      this.salasDisponiveisFiltradas = this.todasSalasDisponiveis.map(sala => ({
        ...sala,
        horarios: { manha: sala.horarios.manha || ['N/A', 'N/A'] }
      }));
      this.salasIndisponiveisFiltradas = this.todasSalasIndisponiveis.map(sala => ({
        ...sala,
        horarios: { noite: sala.horarios.noite || ['N/A', 'N/A'] }
      }));
    } else {
      this.salasDisponiveisFiltradas = this.todasSalasDisponiveis.map(sala => {
        const horarioDoTurno = sala.horarios[turno.toLowerCase() as keyof SalaCard['horarios']];
        return {
          ...sala,
          horarios: { [turno.toLowerCase()]: horarioDoTurno || ['N/A', 'N/A'] }
        };
      });
      this.salasIndisponiveisFiltradas = this.todasSalasIndisponiveis.map(sala => ({
        ...sala,
        horarios: { noite: sala.horarios.noite || ['N/A', 'N/A'] }
      }));
    }
  }

  abrirCalendario() {
    this.mostrarCalendario.set(!this.mostrarCalendario());
  }

  onMouseDown(e: MouseEvent) {
    const elem = e.currentTarget as HTMLElement;
    this.isDown = true;
    this.dragElem = elem;
    this.startX = e.pageX - elem.offsetLeft;
    this.scrollLeft = elem.scrollLeft;
  }

  onMouseLeave() {
    this.isDown = false;
    this.dragElem = null;
  }

  onMouseUp() {
    this.isDown = false;
    this.dragElem = null;
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    const elem = e.currentTarget as HTMLElement;
    if (this.dragElem !== elem) return;
    e.preventDefault();
    const x = e.pageX - elem.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    elem.scrollLeft = this.scrollLeft - walk;
  }

  onTouchStart(e: TouchEvent) {
    const elem = e.currentTarget as HTMLElement;
    this.isDown = true;
    this.dragElem = elem;
    this.startX = e.touches[0].pageX - elem.offsetLeft;
    this.scrollLeft = elem.scrollLeft;
  }

  onTouchEnd() {
    this.isDown = false;
    this.dragElem = null;
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDown) return;
    const elem = e.currentTarget as HTMLElement;
    if (this.dragElem !== elem) return;
    const x = e.touches[0].pageX - elem.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    elem.scrollLeft = this.scrollLeft - walk;
  }

  todasSalasDisponiveis: (SalaCard)[] = [
    {
      nome: 'Laboratório Tecnológico I',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Exemplo I',
      local: 'Prédio II',
      sublocal: 'S3 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 6) + 1 // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio II',
      sublocal: 'Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 6) + 1 // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório de Química',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Metodologias Ativas II',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Inovação',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Maquetaria',
      local: 'Prédio I',
      sublocal: 'S2 [subsolo]',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Robótica',
      local: 'Prédio II',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 6) + 1 // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo III',
      local: 'Prédio I',
      sublocal: 'S1 [subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo IV',
      local: 'Prédio I',
      sublocal: 'Térreo',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo V',
      local: 'Prédio II',
      sublocal: '2º Andar',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 6) + 1 // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo VI',
      local: 'Prédio IV',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_especializado.webp',
      horarios: {
        manha: ['10:00', '11:40'],
        tarde: ['15:00', '16:40'],
        noite: ['20:20', '22:00']
      },
      andar: Math.floor(Math.random() * 4) + 1 // 1-4 para Prédio IV
    },
    {
      nome: 'Laboratório Exemplo VII',
      local: 'Prédio I',
      sublocal: 'Subsolo',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        manha: ['08:00', '09:40'],
        tarde: ['13:00', '14:40'],
        noite: ['18:20', '20:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    }
  ];

  todasSalasIndisponiveis: (SalaCard)[] = [
    {
      nome: 'Laboratório Exemplo ',
      local: 'Prédio I',
      sublocal: 'Metodologias Ativas II',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: '1º Andar',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: '[subsolo]',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório de Física',
      local: 'Prédio II',
      sublocal: '2º Andar',
      imagem: 'assets/img/lab_inovacao.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 6) + 1 // 1-6 para Prédio II
    },
    {
      nome: 'Laboratório Exemplo II',
      local: 'Prédio I',
      sublocal: 'Térreo',
      imagem: 'assets/img/lab_tecnologico.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    },
    {
      nome: 'Laboratório Exemplo III',
      local: 'Prédio I',
      sublocal: 'Subsolo',
      imagem: 'assets/img/lab_metodologias.webp',
      horarios: {
        noite: ['20:00', '22:00']
      },
      andar: Math.floor(Math.random() * 11) + 1 // 1-11 para Prédio I
    }
  ];

}