import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoButtonModule ,
  PoNotificationModule,
} from '@po-ui/ng-components';

import { PoPageLoginModule } from '@po-ui/ng-templates'

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoButtonModule,
    PoNotificationModule,
    PoPageLoginModule,
  ],
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
  ];



  private onClick() {
    alert('Clicked in menu item');
  }
}
