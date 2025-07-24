import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PoToolbarModule, PoPageModule, PoModalModule, PoDynamicModule, PoBreadcrumb, PoNotificationService, PoTableModule, PoDynamicFormField } from '@po-ui/ng-components';
import {
  PoPageDynamicTableModule,
  PoPageDynamicTableActions,
  PoPageDynamicTableComponent,

} from '@po-ui/ng-templates';
import { MunicipioService } from '../../../services/municipio/municipio.service';
import { MenuLateralComponent } from '../../../components/menu-lateral/menu-lateral.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-municipios',
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
  templateUrl: './listar-municipios.component.html',
  styleUrls: ['./listar-municipios.component.css']
})
export class ListarMunicipiosComponent {
  page = 1;
  pageSize = 10;

  mostrarTabela = true;
  serviceApi = '';

  @ViewChild('municipiosTable') municipiosTable!: PoPageDynamicTableComponent;

  actionsRight = true;
  quickSearchWidth = 3;

  constructor(
    private router: Router,
    private municipioService: MunicipioService,
    private poNotification: PoNotificationService,
    private http : HttpClient
  ) {}
fields: PoDynamicFormField[] = [];
items: any[] = [];

  ngOnInit() {
  this.serviceApi = this.municipioService.apiUrl;

  this.http.get<any>(`${this.serviceApi}/metadata`).subscribe(response => {
    console.log('Metadata response:', response);
    this.fields = response.fields || [];
    console.log('Campos atribuídos:', this.fields);
  });

  this.municipioService.getMunicipiosPaginados(this.page, this.pageSize).subscribe({
    next: (response) => {
      console.log('Metadata response:', response);
      this.items = response.items || [];
      console.log('Campos atribuídos:', this.items);
    },
    error: (err) => {
      console.error("Erro ao carregar municípios: ", err);
      
    }
  })
  
  }

   actions: PoPageDynamicTableActions = {
    new: '/municipios/novo',

    edit: (_id: string, resource: any) => {
      this.router.navigate([`/municipios/editar/${resource.id}`]);
      return { route: `/municipios/editar/${resource.id}` };
    },

    remove: (_id: string, resource: any) => {
      this.municipioService.delete(resource.id).subscribe({
        next: () => {
          this.poNotification.success('Município excluído com sucesso!');
          this.recarregarTabela();
        },
        error: () => {
          this.poNotification.error('Erro ao excluir o município.');
        }
      });
      return false; // para o comportamento default do PO UI
    },

    removeAll: true
  };

  // deleteAction: PoPageDynamicTableActions = {
  //   removeAll: (resources: any[]) => {
  //     const rows = this.getSelectedRows();
  //     const ids = this.extractIdsFromRows(rows);
  //     console.log(resources);
  //     return ids.map(id => ({ id }));
  //   }
  // };

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Municípios' }
    ],
  };

  recarregarTabela() {
    this.mostrarTabela = false;
    setTimeout(() => this.mostrarTabela = true, 0);
  }
}


// removeAll: (resources: any) => {
//       const rows = this.getSelectedRows();
//       const ids = this.extractIdsFromRows(rows);
//       console.log(resources);

//       console.log('IDs das linhas selecionadas:', ids);

//       if (ids.length === 0) {
//         this.poNotification.warning('Nenhum item selecionado para remover.');
//         return [];
//       }

//       this.municipioService.deleteBatch(ids).subscribe({
//         next: () => {
//           this.poNotification.success('Itens removidos com sucesso!');
//           this.recarregarTabela();
//         },
//         error: () => {
//           this.poNotification.error('Erro ao remover os itens selecionados.');
//         }
//       });

//       return ids.map(id => ({ id }));
//     }
