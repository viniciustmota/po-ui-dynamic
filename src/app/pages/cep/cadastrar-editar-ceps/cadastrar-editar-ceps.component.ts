import { Component } from '@angular/core';
import { PoToolbarModule, PoPageModule, PoDynamicModule, PoButtonModule, PoDynamicFormField, PoNotification, PoNotificationService } from "@po-ui/ng-components";
import { MenuLateralComponent } from "../../../components/menu-lateral/menu-lateral.component";
import { UfService } from '../../../services/uf/uf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location  } from '@angular/common';
import { CepService } from '../../../services/cep/cep.service';


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
    private cepService : CepService,
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
      this.cepService.getByCep(id).subscribe({
        next: (data) => {
          this.model = data;
        },
        error: () => {
          this.poNotification.error('Erro ao carregar os dados do município.');
        }
      })
    }

    this.cepService.obterCamposFormulario().subscribe({
      next: (metadata) => {
        this.fields = metadata.fields.filter((field: PoDynamicFormField) => field.property !== 'ufSigla');
        console.log('fields:', this.fields);
        console.log('model:', this.model);
      },
      error: () => {
        this.poNotification.error('Erro ao carregar campos do formulário.');
      }
    });
  }

  submit(formData: any) {
    // if (!formData.cep || formData.cep.toString().length == 8) {
    //   this.poNotification.warning('O Cep deve ter 8 dígitos.');
    //   return;
    // }

    const request = this.isEditMode
      ? this.cepService.EditarMunicipio(formData)
      : this.cepService.CriarMunicipio(formData);

    request.subscribe({
      next: () => {
        this.poNotification.success(`CEP ${this.Notificacao} com sucesso!`);
        this.router.navigate(['/ceps']);
      },
      error: (err) => {
        this.poNotification.error(`Erro ao ${this.NomeMetodo} CEP.`);
      }
    })
  }

  voltar()
  {
    this.location.back();
  }
}

