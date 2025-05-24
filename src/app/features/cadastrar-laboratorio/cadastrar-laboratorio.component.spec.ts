import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarLaboratorioComponent } from './cadastrar-laboratorio.component';

describe('CadastrarLaboratorioComponent', () => {
  let component: CadastrarLaboratorioComponent;
  let fixture: ComponentFixture<CadastrarLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarLaboratorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
