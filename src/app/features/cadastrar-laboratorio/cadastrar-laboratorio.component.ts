import { Component, AfterViewInit } from '@angular/core';
import { SelecaoComponent } from "../../shared/componente-selecao/selecao.component";

@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrl: './cadastrar-laboratorio.component.scss',
  standalone:true,
})
export class CadastrarLaboratorioComponent implements AfterViewInit{
  predioSelecionado = 0;
  andarSelecionado = 0;

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
}
