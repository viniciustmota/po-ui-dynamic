import { Component } from '@angular/core';
import { LoginService, LoginDto} from '../../services/login/login.service';
import { Router } from '@angular/router';

import { PoButtonModule, PoFieldModule, PoNotificationService, PoNotificationModule, PoPageModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoButtonModule,
    PoFieldModule,
    PoNotificationModule,
    PoPageModule
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  fazerLogin() {
    const loginDto: LoginDto = { email: this.email };

    if (!this.email) {
      this.poNotification.warning('Por favor, digite seu e-mail.'); // Exibe um aviso
      return; // Interrompe a execução do método se o campo estiver vazio
    }

    this.loginService.login(loginDto).subscribe({
      next: (res) => {
        if (res.authenticated) {
          this.poNotification.success('Login efetuado com sucesso!');
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('Authorization', `Bearer ${res.accessToken}`);
          localStorage.setItem('userName', res.name);
          this.router.navigate(['/home']);
        } else {
          console.warn('Não autenticado');
        }
      },
      error: (err) => {
        let errorMessage = 'Ocorreu um erro no login. Tente novamente.';
          if (err.status === 400 || err.status === 401) {
            errorMessage = err.error?.message || 'Credenciais inválidas ou e-mail não reconhecido.';
          } else if (err.status === 0) {
              errorMessage = 'Não foi possível conectar ao servidor. Sua API está rodando?';
          }
          this.poNotification.error(errorMessage);
      },
    });
  }
}
