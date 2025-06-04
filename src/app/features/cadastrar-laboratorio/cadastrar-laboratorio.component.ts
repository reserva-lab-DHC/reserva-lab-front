import { Component, AfterViewInit } from '@angular/core';
import { SelecaoComponent } from '../../shared/componente-selecao/selecao.component';
import { FormsModule } from '@angular/forms'
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';
@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent, FormsModule],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrls: ['./cadastrar-laboratorio.component.scss'],
  standalone: true,

})
export class CadastrarLaboratorioComponent implements AfterViewInit {
  nomeLab = '';
  predioSelecionado = 0;
  andarSelecionado = 0;

  constructor(private laboratorioService: LaboratorioService) { }

  ngAfterViewInit(): void {
    const imagemLab = document.getElementById('imagemLab') as HTMLImageElement;
    const uploadInput = document.getElementById('upload') as HTMLInputElement;

    imagemLab?.addEventListener('click', () => {
      uploadInput?.click();
    });
    //SISTEMA QUE FAZ A IMAGEM APARECER NO LUGAR DO ICONE AO SELECIONA-LA
    // uploadInput?.addEventListener('change', (event: Event) => {
    //   const file = (event.target as HTMLInputElement).files?.[0];

    //   if (file && file.type.startsWith('image/')) {
    //     const reader = new FileReader();

    //     reader.onload = (e: ProgressEvent<FileReader>) => {
    //       const result = e.target?.result as string;
    //       imagemLab.src = result;
    //     };

    //     reader.readAsDataURL(file);
    //   }
    // });
  }
  registrar() {

    const novoLab: LaboratorioDTO = {
      nomeSala: this.nomeLab,
      predio: this.predioSelecionado,
      andar: this.andarSelecionado,
    };


    this.laboratorioService.cadastrarLaboratorio(novoLab)
      .then((res: LaboratorioDTO | undefined) => {
        console.log('Laboratório cadastrado:', res);
        alert('Cadastro realizado com sucesso!');//aqui caberia aparecer um modal 
      })
      .catch((err: Error) => {
        console.error('Erro ao cadastrar laboratório:', err);
        alert('Erro ao cadastrar laboratório');//aqui caberia aparecer um modal 
      });
  }
}
