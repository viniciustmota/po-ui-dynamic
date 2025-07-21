import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoMenuModule, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu-lateral',
  imports: [PoMenuModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  name : string = '';

  readonly menus: Array<PoMenuItem> = [
    { label: 'Página Inicial', link: '/home' },
    { label: 'CEP', link: '/cadastrar-cep'},
    { label: 'Municipio', link: '/municipios' },
    { label: 'Sair', action: this.logout.bind(this) }
  ];

  constructor(
    private poNotification : PoNotificationService,
    private router : Router
  ) {}

  showAlert() {
    // Use o serviço de notificação do PO UI
    this.poNotification.success('Você clicou no botão PO UI!');
  }

  private logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');

    this.router.navigate(['/login'])
  }
}
