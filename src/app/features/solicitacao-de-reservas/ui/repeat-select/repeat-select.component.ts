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
    selectedOption = signal<'none' | 'day' | 'week' | 'month'>('none');
    dateSelected = signal<Date | null>(null);

    selectionChange = output<RepeatSelection>();

    form = new FormGroup({
        none: new FormControl<string>(''),
        day: new FormControl<string>('', [Validators.required]),
        week: new FormControl<string>('', [Validators.required]),
        month: new FormControl<string>('', [Validators.required]),
        calendar: new FormControl<Date | null>(null)
    });

    showOptions(): void {
        this.showOpts.set(!this.showOpts());
    }

    selectOption(option: 'none' | 'day' | 'week' | 'month'): void {
        this.selectedOption.set(option);
        const value = this.form.get(option)?.value ?? '';
        if (option === 'none' || option === 'day') {
            this.selectionChange.emit({ category: option, value, finalDate: null });
        }
    }

    onCalendarDateChanges(date: Date | null) {
        this.dateSelected.set(date);
        const option = this.selectedOption();
        const value = this.form.get(option)?.value ?? '';
        if ((option === 'week' || option === 'month') && date) {
            this.selectionChange.emit({ category: option, value, finalDate: date });
        }
    }

    formatDateToLongString(date: Date | null): string {
        if (!date) return '';
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
    }

}
