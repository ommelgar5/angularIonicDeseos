import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  /* 
    Que busque en el HTML el elemento(componente) IonList (ion-list) y que lo asigne a la variable lista,
    si ubiran mas ion-list en el HTML retornaria en Array de IonList
    @ViewChild( SELECTOR ) variable: tipo;
    
    @ViewChild ('lista') lista: IonList;   -> Es por referencia local
    <ion-list #lista>

  */
  @ViewChild ( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {}

  ngOnInit() {}
  
  listaSelecionada(lista: Lista) {
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }


  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarTitulo(lista: Lista) {

    const alerta = await this.alertCtrl.create({
      header: 'Editar nombre lista',
      inputs: [
        {
          name: 'nuevoTitulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar - editar nombre lista');
            // Cerrar todos los elementos abiertos
            this.lista.closeSlidingItems();
            
          }
        },
        {
          text: 'Aceptar',
          handler: ( datosFormulario) => {
              if( datosFormulario.nuevoTitulo.length === 0) return;
              lista.titulo = datosFormulario.nuevoTitulo;
              this.deseosService.guardarStorage();

              // Cerrar todos los elementos abiertos
              this.lista.closeSlidingItems();
              }
          }
      ]
    });

    alerta.present();
  }

}
