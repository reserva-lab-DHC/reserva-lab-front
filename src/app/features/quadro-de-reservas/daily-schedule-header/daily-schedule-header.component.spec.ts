import { TestBed } from '@angular/core/testing';
import { ScheduleTableComponent } from '../../../shared/schedule-table/schedule-table.component';
describe('ScheduleTableComponent', () => {
  let component: ScheduleTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleTableComponent] // Garanta que o componente standalone é importado aqui
    })
    .compileComponents();

    const fixture = TestBed.createComponent(ScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});