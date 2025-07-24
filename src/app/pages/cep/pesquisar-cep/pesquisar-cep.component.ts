import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoToolbarModule, PoPageModule, PoModalModule, PoDynamicModule, PoNotificationService, PoTableModule, PoDynamicFormField, PoInfoModule, PoButtonModule, PoContainerModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { MenuLateralComponent } from '../../../components/menu-lateral/menu-lateral.component';
import { CepService } from '../../../services/cep/cep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar-cep',
  standalone: true,
  imports: [
    CommonModule,
    PoToolbarModule,
    PoPageModule,
    PoModalModule,
    PoDynamicModule,
    MenuLateralComponent,
    PoPageDynamicTableModule,
    PoTableModule,
    PoInfoModule,
    PoButtonModule,
    PoContainerModule
],
  templateUrl: './pesquisar-cep.component.html',
  styleUrl: './pesquisar-cep.component.css'
})
export class ListarCepsComponent {
  model: { [key: string]: any } = {};
  camposBusca: PoDynamicFormField[] = [
    {
      property: 'cep',
      label: 'CEP',
      required: true,
      gridColumns: 6
    }
  ];

  ngOnInit() {
    this.model = {};
  }

  cepEncontrado: any = null;

  constructor(
    private router: Router,
    private cepService: CepService,
    private poNotification: PoNotificationService
  ) {}

  buscarCep() {
    const cep = this.model['cep'];
    if (!cep) {
      this.poNotification.warning('Digite um CEP antes de buscar.');
      return;
    }

    this.cepService.getByCep(cep).subscribe({
      next: (result) => {
        this.cepEncontrado = result;
        this.router.navigate(['/ceps/visualizar/', cep])
      },
      error: () => {
        this.poNotification.error('CEP não encontrado.');
        this.cepEncontrado = null;
      }
    });
  }

  irParaMunicipios() {
    this.router.navigate(['/ceps/novo']);
  }
}