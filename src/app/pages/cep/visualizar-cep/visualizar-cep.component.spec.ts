import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCepComponent } from './visualizar-cep.component';

describe('VisualizarCepComponent', () => {
  let component: VisualizarCepComponent;
  let fixture: ComponentFixture<VisualizarCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarCepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
