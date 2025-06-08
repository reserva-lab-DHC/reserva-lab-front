import { TestBed } from '@angular/core/testing';
import { ScheduleTableComponent } from '../schedule-table/schedule-table.component';
import { CommonModule } from '@angular/common'; // exemplo
import { HttpClientTestingModule } from '@angular/common/http/testing'; // se usa serviços HTTP
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // evita erros de animação

describe('ScheduleTableComponent', () => {
  let component: ScheduleTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScheduleTableComponent, // Standalone component
        CommonModule,           // se necessário
        HttpClientTestingModule,
        NoopAnimationsModule,   // substitui BrowserAnimationsModule
        // outros modules ou components necessários
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
