import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import {
  PoMenuItem, // Se for usar, mantenha. Se não, pode remover.
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoButtonModule,
  PoNotificationService, // Serviço, injetado, não no imports
  PoNotificationModule,
} from '@po-ui/ng-components';
import { LoginService , LoginDto} from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, // <-- Adicione CommonModule aqui
    PoMenuModule,
    PoPageModule,
    PoToolbarModule,
    PoButtonModule,
    PoNotificationModule,
    MenuLateralComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  name : string = '';


  constructor(
    private poNotification : PoNotificationService,
    private router : Router
  ) {}

  showAlert() {
    // Use o serviço de notificação do PO UI
    this.poNotification.success('Você clicou no botão PO UI!');
  }

  ngOnInit() {
    this.name = localStorage.getItem('userName') || '';
  }

}
