import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController
              ) {}

              
  async agregarLista(){
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Ha cancelado');
            }
          },
          {
            text: 'Crear',
            handler: (dataFormulario) => {
                console.log(dataFormulario);
                if( dataFormulario.titulo.length === 0){
                    return;
                }
                const idLista = this.deseosService.crearLista( dataFormulario.titulo );

                this.router.navigateByUrl(`/tabs/tab1/agregar/${ idLista }`);
            }
          } 
        ]
    });

    alert.present();
  }

  listaSelecionada(lista: Lista) {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
  }

}
