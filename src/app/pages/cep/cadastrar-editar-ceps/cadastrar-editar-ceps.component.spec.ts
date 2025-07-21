import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarCepsComponent } from './cadastrar-editar-ceps.component';

describe('CadastrarEditarCepsComponent', () => {
  let component: CadastrarEditarCepsComponent;
  let fixture: ComponentFixture<CadastrarEditarCepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEditarCepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarCepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
