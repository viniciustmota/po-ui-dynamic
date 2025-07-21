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
  mostrarTabela = true;
  serviceApi = '';

  @ViewChild('municipiosTable') municipiosTable!: PoPageDynamicTableComponent;

  actionsRight = true;
  quickSearchWidth = 3;

  constructor(
    private router: Router,
    private municipioService: MunicipioService,
    private poNotification: PoNotificationService,
  ) {}

fields: PoDynamicFormField[] = [
    { property: 'id', label: 'ID', visible: true, key: true},
    { property: 'nome', label: 'Município' },
    { property: 'codIBGE', label: 'Código IBGE' },
    { property: 'ufSigla', label: 'UF' }
  ];

  ngOnInit() {
    this.serviceApi = `${this.municipioService.apiUrl}`;
  }

   actions: PoPageDynamicTableActions = {
    new: '/municipios/novo',

    edit: (_id: string, resource: any) => {
      this.router.navigate([`/municipios/editar/${resource.id}`]);
      return { route: `/municipios/editar/${resource.id}` };
    },

    detail: (_id: string, resource: any) => {
      this.router.navigate([`/municipios/detalhar/${resource.id}`]);
      return { route: `/municipios/detalhar/${resource.id}` };
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

  private getSelectedRows(): HTMLTableRowElement[] {
  return Array.from(
    document.querySelectorAll('tr.po-table-row-active')
  ) as HTMLTableRowElement[];
}

  private extractIdsFromRows(rows: HTMLTableRowElement[]): string[] {
    return rows.map(row => {
      const idCell = row.querySelector('td:nth-child(2) span');
      return idCell?.textContent?.trim() || '';
    }).filter(id => !!id);
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
