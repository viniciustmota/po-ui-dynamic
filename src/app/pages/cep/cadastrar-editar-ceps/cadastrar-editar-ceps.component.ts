import { Component } from '@angular/core';
import { PoToolbarModule, PoPageModule, PoDynamicModule, PoButtonModule, PoDynamicFormField, PoNotification, PoNotificationService } from "@po-ui/ng-components";
import { MenuLateralComponent } from "../../../components/menu-lateral/menu-lateral.component";
import { UfService } from '../../../services/uf/uf.service';
import { MunicipioService } from '../../../services/municipio/municipio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location  } from '@angular/common';


@Component({
  selector: 'app-cadastrar-editar-ceps',
  imports: [CommonModule, PoToolbarModule, MenuLateralComponent, PoPageModule, PoDynamicModule, PoButtonModule],
  templateUrl: './cadastrar-editar-ceps.component.html',
  styleUrl: './cadastrar-editar-ceps.component.css'
})
export class CadastrarEditarCepsComponent {
  isEditMode = false;

  NomeMetodo = "";
  Notificacao = "";
  fields: Array<PoDynamicFormField> = []
  model = {};

  constructor(
    private ufService: UfService,
    private municipioService : MunicipioService,
    private poNotification : PoNotificationService,
    private router : Router,
    private route : ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    this.NomeMetodo = this.isEditMode ? 'editar' : 'cadastrar';
    this.Notificacao = this.isEditMode ? 'editado' : 'cadastrado';

    if(this.isEditMode && id)
    {
      this.municipioService.getMunicipio(id).subscribe({
        next: (data) => {
          this.model = data;
        },
        error: () => {
          this.poNotification.error('Erro ao carregar os dados do município.');
        }
      })
    }

    this.municipioService.obterCamposFormulario().subscribe({
      next: (metadata) => {
        this.fields = metadata.fields.filter((field: PoDynamicFormField) => field.property !== 'ufSigla');
      },
      error: () => {
        this.poNotification.error('Erro ao carregar campos do formulário.');
      }
    });
  }

  submit(formData: any) {
    if (!formData.codIBGE || formData.codIBGE.toString().length > 7) {
      this.poNotification.warning('O código IBGE deve ter no máximo 7 dígitos.');
      return;
    }

    const request = this.isEditMode
      ? this.municipioService.EditarMunicipio(formData)
      : this.municipioService.CriarMunicipio(formData);

    request.subscribe({
      next: () => {
        this.poNotification.success(`Município ${this.Notificacao} com sucesso!`);
        this.router.navigate(['/municipios']);
      },
      error: (err) => {
        this.poNotification.error(`Erro ao ${this.NomeMetodo} município.`);
      }
    })
  }

  voltar()
  {
    this.location.back();
  }
}

