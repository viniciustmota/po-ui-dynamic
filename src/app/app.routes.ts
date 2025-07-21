// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarCepComponent } from './pages/cadastrar-cep/cadastrar-cep.component';
import { CadastrarEditarMunicipioComponent } from './pages/municipio/cadastrar-editar-municipio/cadastrar-editar-municipio.component';
import { ListarMunicipiosComponent } from './pages/municipio/listar-municipios/listar-municipios.component';
import { environment } from '../environments/environments';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ceps/novo',
    component: CadastrarCepComponent,
    canActivate: [authGuard]
  },
  {
    path: 'municipios/novo',
    component: CadastrarEditarMunicipioComponent,
    canActivate: [authGuard]
  },
  {
  path: 'municipios',
  component: ListarMunicipiosComponent,
  canActivate: [authGuard],
  // data: {
  //     serviceApi: `${environment.apiBaseUrl}/Municipios`,
  //     idFeld: 'id',
  //   }
  },
  {
    path: 'municipios/editar/:id',
    component: CadastrarEditarMunicipioComponent,
    canActivate: [authGuard]
  }
];
