import { ListaItem } from './lista-item.model';

export class Lista {
  
  id: number;
  titulo: string;
  creadaEn: Date;
  terminidaEn: Date;
  terminda: boolean;
  items: ListaItem[];
  
  constructor( titulo: string ){
    this.id = new Date().getTime();
    this.titulo = titulo;  
    this.creadaEn = new Date();
    this.terminda = false;
    this.items = [];
  } 
  
}