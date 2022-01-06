import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinhasOnibusComponent } from './views/linhas-onibus/linhas-onibus.component';
import { ItinerarioComponent } from './views/itinerario/itinerario.component';
import { LinhasLotacaoComponent } from './views/linhas-lotacao/linhas-lotacao.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'linhas-de-onibus',
    component: LinhasOnibusComponent,
  },
  {
    path: 'linhas-de-lotação',
    component: LinhasLotacaoComponent,
  },
  {
    path: 'itinerario/:id',
    component: ItinerarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
