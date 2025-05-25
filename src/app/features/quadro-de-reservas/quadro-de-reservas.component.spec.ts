import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroDeReservasComponent } from './quadro-de-reservas.component';

describe('QuadroDeReservasComponent', () => {
  let component: QuadroDeReservasComponent;
  let fixture: ComponentFixture<QuadroDeReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroDeReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadroDeReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
