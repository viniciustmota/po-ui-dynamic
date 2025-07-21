import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMunicipioComponent } from './cadastrar-editar-municipio.component';

describe('CadastrarMunicipioComponent', () => {
  let component: CadastrarMunicipioComponent;
  let fixture: ComponentFixture<CadastrarMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarMunicipioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
