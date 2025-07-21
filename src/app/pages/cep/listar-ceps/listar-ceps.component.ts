import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PoToolbarModule, PoPageModule, PoModalModule, PoDynamicModule, PoBreadcrumb, PoNotificationService, PoTableModule, PoDynamicFormField } from '@po-ui/ng-components';
import {
  PoPageDynamicTableModule,
  PoPageDynamicTableActions,
  PoPageDynamicTableComponent,

} from '@po-ui/ng-templates';
import { MenuLateralComponent } from '../../../components/menu-lateral/menu-lateral.component';
import { HttpClient } from '@angular/common/http';
import { CepService } from '../../../services/cep/cep.service';

@Component({
  selector: 'app-listar-ceps',
  standalone: true,
  imports: [
    CommonModule,
    PoToolbarModule,
    PoPageModule,
    PoModalModule,
    PoDynamicModule,
    MenuLateralComponent,
    PoPageDynamicTableModule,
    PoTableModule
],
  templateUrl: './listar-ceps.component.html',
  styleUrl: './listar-ceps.component.css'
})
export class ListarCepsComponent {
  mostrarTabela = true;
  serviceApi = '';

  @ViewChild('municipiosTable') municipiosTable!: PoPageDynamicTableComponent;

  actionsRight = true;
  quickSearchWidth = 3;

  constructor(
    private router: Router,
    private cepService: CepService,
    private poNotification: PoNotificationService,
    private http : HttpClient
  ) {}
fields: PoDynamicFormField[] = [];
items: any[] = [];

  ngOnInit() {
  this.serviceApi = this.cepService.apiUrl;

  this.http.get<any>(`${this.serviceApi}/metadata`).subscribe(response => {
    console.log('Metadata response:', response);
    this.fields = response.fields || [];
    console.log('Campos atribuídos:', this.fields);
  });

  this.http.get<any>(`${this.serviceApi}`).subscribe(response => {
    console.log('Data response:', response);
    this.items = response.items || [];
    console.log('Itens atribuídos:', this.items);
  });
  }

   actions: PoPageDynamicTableActions = {
    new: '/ceps/novo',

    edit: (_id: string, resource: any) => {
      this.router.navigate([`/ceps/editar/${resource.id}`]);
      return { route: `/ceps/editar/${resource.id}` };
    },

    remove: (_id: string, resource: any) => {
      this.cepService.delete(resource.id).subscribe({
        next: () => {
          this.poNotification.success('Município excluído com sucesso!');
          this.recarregarTabela();
        },
        error: () => {
          this.poNotification.error('Erro ao excluir o município.');
        }
      });
      return false;
    },

    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'CEPs' }
    ],
  };

  recarregarTabela() {
    this.mostrarTabela = false;
    setTimeout(() => this.mostrarTabela = true, 0);
  }
}