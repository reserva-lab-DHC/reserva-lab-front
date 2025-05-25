import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoDeReservasComponent } from './solicitacao-de-reservas.component';

describe('SolicitacaoDeReservasComponent', () => {
  let component: SolicitacaoDeReservasComponent;
  let fixture: ComponentFixture<SolicitacaoDeReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoDeReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoDeReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
