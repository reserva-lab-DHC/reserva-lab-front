import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoComponent } from './acesso.component';

describe('AcessoComponent', () => {
  let component: AcessoComponent;
  let fixture: ComponentFixture<AcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
