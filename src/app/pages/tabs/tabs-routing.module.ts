import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          /* 
          Los modulos cargan por demanda (Lazy-loading)

          path: ''
            - pathMatch: prefix,   valor por defecto
            - un path vacio siempre es un prefijo de cualquier URL, por eso es importante
              ocupar pathMatch: 'full' cuando ocupamos redirectTo: '' para evitar bucles

              En este ejemplo por defecto cargara el primer path porque coincide con la URL,
              sin que use mas paratros despues del path padre
              /tabs/tab1/''      -> cargara el primero hijo
              /tabs/tab1/agregar -> cargara el sedundo hijo
          */

          {
            path: '',
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: 'agregar/:idLista',
            loadChildren: () => import('../agregar/agregar.module').then(m => m.AgregarPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          },
          {
            path: 'agregar/:idLista',
            loadChildren: () => import('../agregar/agregar.module').then(m => m.AgregarPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
