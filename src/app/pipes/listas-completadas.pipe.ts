import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

/* 
    PIPE IMPUROS
    Los pipe por defecto no modifican la informacion que pasa por ellos (PIPE PUROS), lo hacen anivel visual pero no modifican
    los datos. 
    Pero si el pipe modifica la informacion Angular lo tiene encueta ese cambio porque
    estan fuera del ciclo de deteccion de cambios por eso Angular no toma encuenta esos cambios, ademas angular
    detecta que los cambios se estan haciendo fuera del modulo donde esta los datos originales

    *ngFor="let lista for deseosService.listas | listasCompletas" 
        Las listas que estan en deseosServices.listas primero pasan por el pipe listasCompletadas y el resultado
        de ese pipe se pasa al *ngFor para se recorrido. 
        Pero como por defecto el pipe son puros los cambios realizados que se pasara al *ngFor no es tomando encuenta
 
    para evitar eso en el decorador se establece la propiedad 
    @Pipe({
      pure: false
    })

*/
@Pipe({
  name: 'listasCompletadas',
  pure: false
})
export class ListasCompletadasPipe implements PipeTransform {

  transform(listas: Lista[], completadas: boolean = true): Lista[] {
    return listas.filter( lista => lista.terminda === completadas );
  }

}
