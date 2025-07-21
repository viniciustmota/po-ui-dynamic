import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCepComponent } from './cadastrar-cep.component';

describe('CadastrarCepComponent', () => {
  let component: CadastrarCepComponent;
  let fixture: ComponentFixture<CadastrarCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
