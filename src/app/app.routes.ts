import { Routes } from '@angular/router';
import {StarshipsComponent} from './starships/starships.component';
import {StarshipDetailComponent} from './starship-detail/starship-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: StarshipsComponent,
    pathMatch: 'full'
  },
  {
    path: 'starships',
    component: StarshipsComponent,
  },
  {
    path: 'starship-detail',
    component: StarshipDetailComponent
  }
];
