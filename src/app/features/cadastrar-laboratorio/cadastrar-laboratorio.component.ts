import { Component, inject,signal } from '@angular/core';
import { SelecaoComponent } from '../../shared/componente-selecao/selecao.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { NgIf } from '@angular/common';
@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent, ReactiveFormsModule, DynamicButtonComponent, InputTextComponent, NgIf],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrls: ['./cadastrar-laboratorio.component.scss'],
  standalone: true,

})
export class CadastrarLaboratorioComponent /* implements AfterViewInit  */ {
  predioSelecionado = 0;
  andarSelecionado = 0;

  laboratorioService = inject(LaboratorioService);

  formulario = new FormGroup({
    andarSelecionado: new FormControl<number |null>(null, [Validators.required]),
    predioSelecionado: new FormControl<number |null>(null, [Validators.required]),
    nomeSala: new FormControl('', [Validators.required]),
  });

  isLoading = signal(false);

  constructor() { }

  /* ngAfterViewInit(): void {
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
  } */
  registrar() {
    if (this.formulario.invalid) {
      // Marcar todos os campos como tocados para ativar mensagens de erro
      this.formulario.markAllAsTouched();

      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const nomeSala = this.formulario.get('nomeSala')?.value ?? '';
    const predio = this.formulario.get('predioSelecionado')?.value ?? 0;
    const andar = this.formulario.get('andarSelecionado')?.value ?? 0;

    const novoLab: LaboratorioDTO = {
      nomeSala: nomeSala,
      predio: predio,
      andar: andar,
    };

    this.isLoading.set(true);

    this.laboratorioService.cadastrarLaboratorio(novoLab)
      .then((res: LaboratorioDTO | undefined) => {
        console.log('Laboratório cadastrado:', res);
        alert('Cadastro realizado com sucesso!');//aqui caberia aparecer um modal 
        this.formulario.reset({
        nomeSala: '',
        predioSelecionado: null,
        andarSelecionado: null
    });
      })
      .catch((err: Error) => {
        console.error('Erro ao cadastrar laboratório:', err);
        alert('Erro ao cadastrar laboratório');//aqui caberia aparecer um modal 
      })
      .finally(() => {
        // Sempre desliga loading, sucesso ou erro
        this.isLoading.set(false);
      });
      

  }
}
