import { Component } from '@angular/core';
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  standalone: true,
  imports: [InputSelectComponent, CardComponent]
})
export class InicioComponent {

  dataSelecionada = '06/01';

  salasDisponiveis = [
    {
      nome: 'Laboratório Tecnológico I',
      horario: '18:20',
      horario2: '20:00',
      local: 'S2 (subsolo)',
      imagem: 'assets/img/lab-tec1.jpg'
    },
    {
      nome: 'Laboratório de Química',
      horario: '18:20',
      horario2: '20:00',
      local: 'S2 (subsolo)',
      imagem: 'assets/img/lab-quimica.jpg'
    }
  ];

  salasIndisponiveis = [
    {
      nome: 'Metodologias Ativas II',
      horario: '20:00',
      horario2: '',
      local: '1º Andar',
      imagem: 'assets/img/metodologias.jpg'
    }
  ];
}
