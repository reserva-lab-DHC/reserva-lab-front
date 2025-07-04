import {  Component, inject, signal } from '@angular/core';
import { SelecaoComponent } from '../../shared/componente-selecao/selecao.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioDTO } from '../../shared/models/laboratorio.dto';
import { DynamicButtonComponent } from "../../shared/dynamic-button/dynamic-button.component";
import { InputTextComponent } from "../../shared/input-text/input-text.component";
import { NgForOf, NgIf } from '@angular/common';
import { FotosPorNumero } from '../../shared/models/fotos.enum';
@Component({
  selector: 'dhc-cadastrar-laboratorio',
  imports: [SelecaoComponent, ReactiveFormsModule, DynamicButtonComponent, InputTextComponent, NgIf,NgForOf],
  templateUrl: './cadastrar-laboratorio.component.html',
  styleUrls: ['./cadastrar-laboratorio.component.scss'],
  standalone: true,

})
export class CadastrarLaboratorioComponent {
  predioSelecionado = 0;
  andarSelecionado = 0;

  laboratorioService = inject(LaboratorioService);

  formulario = new FormGroup({
    andarSelecionado: new FormControl<number | null>(null, [Validators.required]),
    predioSelecionado: new FormControl<number | null>(null, [Validators.required]),
    nomeSala: new FormControl('', [Validators.required]),
    imagem: new FormControl<number | null>(null, [Validators.required]),
  
  });

  isLoading = signal(false);
  andaresDisponiveis = signal<number[]>([]);

  imagensMock = Object.keys(FotosPorNumero).map(Number);
  fotosPorNumero = FotosPorNumero;

  constructor() {
    this.andaresDisponiveis.set(this.calcularAndares(1));

    this.formulario.get('predioSelecionado')?.valueChanges.subscribe(predio => {
      if (predio != null) {
        const andares = this.calcularAndares(predio);
        this.andaresDisponiveis.set(andares);

      const campoAndar = this.formulario.get('andarSelecionado');
      campoAndar?.setValue(null);
      campoAndar?.markAsUntouched(); 
    }
  });
}
calcularAndares(predio: number): number[] {
  return predio === 1 ? [1,2,3,4,5,6,7,8,9,10,11] : [1,2,3,4,5,6];
}
selecionarImagem(id: number) {
    this.formulario.get('imagem')?.setValue(id);
}
  
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
    const imagem = this.formulario.get('imagem')?.value ?? 1;

    const novoLab: LaboratorioDTO = {
      nomeSala: nomeSala,
      predio: predio,
      andar: andar,
      imagem: imagem,
    };

    this.isLoading.set(true);

    this.laboratorioService.cadastrarLaboratorio(novoLab)
      .then((res: LaboratorioDTO) => {
        console.log('Laboratório cadastrado:', res);
        alert('Cadastro realizado com sucesso!');//aqui caberia aparecer um modal 
        this.formulario.reset({
          nomeSala: '',
          predioSelecionado: null,
          andarSelecionado: null,
          imagem: null,
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