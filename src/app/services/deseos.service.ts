import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
       this.cargarStorage();
  }


  crearLista (titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  borrarLista( lista: Lista) {
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }else{
      this.listas = [];
    }

    /*  

    Por defecto la variable listas se crea vacia, no es necesario especificar 
    else { 
      this.listas = [] 
    } 

    */
  }

  obtenerLista(idLista: string | number) {
    idLista = Number(idLista);
    return this.listas.find( lista => lista.id === idLista);
  }

}
