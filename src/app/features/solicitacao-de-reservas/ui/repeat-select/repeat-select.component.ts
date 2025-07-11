import { Component, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "../../../../shared/input-text/input-text.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CalendarComponent } from "../../../../shared/calendar/calendar/calendar.component";

export interface RepeatSelection {
    category: 'none' | 'day' | 'week' | 'month';
    value: string;
    finalDate: Date | null;
}

@Component({
    selector: 'dhc-repeat-select',
    standalone: true,
    templateUrl: './repeat-select.component.html',
    styleUrls: ['./repeat-select.component.scss'],
    imports: [CommonModule, InputTextComponent, ReactiveFormsModule, CalendarComponent]
})
export class RepeatSelectComponent {
    showOpts = signal(false);
    selectedOption = signal<'none' | 'day' | 'week' | 'month' | null>(null);
    dateSelected = signal<Date>(new Date()); // Inicializa com data atual ao invés de null

    selectionChange = output<RepeatSelection>();

    form = new FormGroup({
        none: new FormControl<string>(''),
        day: new FormControl<string>('', [Validators.required]),
        week: new FormControl<string>('', [Validators.required]),
        month: new FormControl<string>('', [Validators.required]),
        calendar: new FormControl<Date | null>(null)
    });

    constructor() {
        this.form.get('day')?.valueChanges.subscribe(value => {
            if (this.selectedOption() === 'day' && value) {
                this.emitSelection('day', value, this.dateSelected());
            }
        });
        this.form.get('week')?.valueChanges.subscribe(value => {
            if (this.selectedOption() === 'week' && value) {
                this.emitSelection('week', value, this.dateSelected());
            }
        });
        this.form.get('month')?.valueChanges.subscribe(value => {
            if (this.selectedOption() === 'month' && value) {
                this.emitSelection('month', value, this.dateSelected());
            }
        });
    }

    showOptions(): void {
        this.showOpts.set(!this.showOpts());
    }

    selectOption(option: 'none' | 'day' | 'week' | 'month'): void {
        this.selectedOption.set(option);
        const value = this.form.get(option)?.value ?? '';
        if (option === 'none') {
            this.emitSelection(option, value, new Date());
        } else {
            // Inicializa com data atual quando seleciona uma opção que precisa de data
            this.dateSelected.set(new Date());
        }
    }

    onCalendarDateChanges(date: Date | null, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        
        if (date) {
            this.dateSelected.set(date);
            const option = this.selectedOption();
            if (option && option !== 'none') {
                const value = this.form.get(option)?.value ?? '';
                this.selectionChange.emit({ category: option, value, finalDate: date });
            }
        }
    }

    formatDateToLongString(date: Date | null): string {
        if (!date) return 'Selecione uma data';
        
        try {
            const dias = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
            const meses = [
                'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
            ];
            const diaSemana = dias[date.getDay()];
            const dia = date.getDate();
            const mes = meses[date.getMonth()];
            const ano = date.getFullYear();
            return `Até ${diaSemana}, ${dia} de ${mes} de ${ano}`;
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    }

    private emitSelection(
        category: 'none' | 'day' | 'week' | 'month',
        value: string,
        finalDate: Date | null
    ) {
        try {
            if (category === 'none') {
                this.selectionChange.emit({ category, value, finalDate: new Date() });
                return;
            }
            if (['day', 'week', 'month'].includes(category) && finalDate) {
                this.selectionChange.emit({ category, value, finalDate });
            }
        } catch (error) {
            console.error('Erro ao emitir seleção:', error);
        }
    }
}
