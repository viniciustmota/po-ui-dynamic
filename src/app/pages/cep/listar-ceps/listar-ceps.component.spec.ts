import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCepsComponent } from './listar-ceps.component';

describe('ListarCepsComponent', () => {
  let component: ListarCepsComponent;
  let fixture: ComponentFixture<ListarCepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
