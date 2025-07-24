import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarEditarMunicipioComponent } from './pages/municipio/cadastrar-editar-municipio/cadastrar-editar-municipio.component';
import { ListarMunicipiosComponent } from './pages/municipio/listar-municipios/listar-municipios.component';
import { ListarCepsComponent } from './pages/cep/pesquisar-cep/pesquisar-cep.component';
import { CadastrarEditarCepsComponent } from './pages/cep/cadastrar-editar-ceps/cadastrar-editar-ceps.component';
import { VisualizarCepComponent } from './pages/cep/visualizar-cep/visualizar-cep.component';

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
    component: CadastrarEditarCepsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ceps/editar',
    component: CadastrarEditarCepsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ceps',
    component: ListarCepsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ceps/visualizar/:id',
    component: VisualizarCepComponent,
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
  },
  {
    path: 'municipios/editar/:id',
    component: CadastrarEditarMunicipioComponent,
    canActivate: [authGuard]
  }
];
