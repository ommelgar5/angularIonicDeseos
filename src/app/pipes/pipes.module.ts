import { NgModule } from '@angular/core';
import { ListasCompletadasPipe } from './listas-completadas.pipe';



@NgModule({
  declarations: [
  ListasCompletadasPipe
],
  exports: [
    ListasCompletadasPipe
  ]
})
export class PipesModule { }
