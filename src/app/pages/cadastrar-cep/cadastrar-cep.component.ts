import { Component } from '@angular/core';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';
import { PoToolbarModule, PoPageModule, PoButtonModule, PoDynamicModule, PoDynamicFormField, PoButtonType} from "@po-ui/ng-components";
import { FormsModule } from '@angular/forms';
import { UfService } from '../../services/uf/uf.service';

@Component({
  selector: 'app-cadastrar-cep',
  imports: [MenuLateralComponent, PoToolbarModule, PoPageModule, PoButtonModule, PoDynamicModule, FormsModule],
  templateUrl: './cadastrar-cep.component.html',
  styleUrl: './cadastrar-cep.component.css',
})
export class CadastrarCepComponent {

  fields: Array<PoDynamicFormField> = []

  constructor(private ufService: UfService) {}

  ngOnInit(): void {
    this.ufService.getUfs().subscribe(ufs => {
      const orderedOptions = ufs
        .sort((a,b) => a.sigla.localeCompare(b.sigla))
        .map(uf => ({
          label: uf.sigla,
          value: uf.id
        }))

      this.fields = [
        {
          property: 'name',
          label: 'Nome',
          required: true,
          type: 'string'
        },
        {
          property: 'subscribe',
          label : 'Assinar',
          type: 'boolean'
        },
        {
          property: 'ufId',
          label: 'UF',
          options: orderedOptions,
          gridColumns: 1
        },
        // outros campos aqui...
      ];
    });
  }

  model = {};

  submit(formData: any) {
    console.log('Formulário enviado: ', formData);
  }
}
