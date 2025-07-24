import { Component } from '@angular/core';
import { PoToolbarModule, PoPageModule, PoButtonModule, PoDynamicModule, PoDynamicFormField, PoDynamicViewField, PoDividerModule, PoContainerModule } from "@po-ui/ng-components";
import { MenuLateralComponent } from "../../../components/menu-lateral/menu-lateral.component";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CepService } from '../../../services/cep/cep.service';

@Component({
  selector: 'app-visualizar-cep',
  imports: [PoToolbarModule, MenuLateralComponent, PoPageModule, PoButtonModule, PoDynamicModule, PoDividerModule, PoContainerModule],
  templateUrl: './visualizar-cep.component.html',
  styleUrl: './visualizar-cep.component.css'
})
export class VisualizarCepComponent {
  fields: PoDynamicViewField[] = []
  cepData : any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cepService: CepService
  ) {}

  ngOnInit(){
    const cep = this.route.snapshot.paramMap.get('id');

    if(cep) {
      this.cepService.getByCep(cep).subscribe(data => {
        this.cepData = data;
      })
    }

    this.cepService.obterCamposFormulario().subscribe(campos => {
      this.fields = campos;    
    });

  }

  irParaMunicipios() {
    this.router.navigate(['/ceps/novo']);
  }

  voltar()
  {
    this.location.back();
  }
}
