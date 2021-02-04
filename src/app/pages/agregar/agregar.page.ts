import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../../models/lista-item.model';
// import { clearScreenDown } from 'readline';
// import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  
  // Crear una relacion bidireccional (two way data binding)
  nombreItem = '';

  constructor(private deseosService: DeseosService, 
              private route: ActivatedRoute
              ) { 

                const idLista = this.route.snapshot.paramMap.get('idLista');
                this.lista = this.deseosService.obtenerLista(idLista);

              }

  ngOnInit() {
  }

  agregarItem() {
    if(this.nombreItem.length === 0){
        return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push(nuevoItem);

    /* 
    NOTA:
      Los objetos en javascript se pasan por referencia, por ende cualquir modificacion
      se hace directamente el el objeto mismo, asi como las modificaciones a sus propiedades

      La propiedad lista  hacer referencia una lista dentro de listas en el Deseosservice,
      si modifcamos esa lista los cambios ocurren en el objeto mismo, y los modemos guardar en el localStorage
      porque se a modificado la informacion

    */
    this.deseosService.guardarStorage();
    this.nombreItem = '';

  }

  cambioCheck( item: ListaItem ){

      console.log(item);

      const pendientes = this.lista.items.filter( itemData => !itemData.completado).length;

      console.log({pendientes});

      if(pendientes === 0){
          this.lista.terminidaEn = new Date();
          this.lista.terminda = true;
        }else{
          this.lista.terminidaEn = null;
          this.lista.terminda = false;
      }
      this.deseosService.guardarStorage();
      console.log(this.lista);
  }
 

  borrar(indice: number){
    this.lista.items.splice(indice, 1);
    this.deseosService.guardarStorage();
  }


}
