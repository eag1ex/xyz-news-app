import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
    // NOTE some resolvers can be added here when we use real api and state management
    // resolve: {
    //   homeProducts: HomeResolver
    //   },
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BypartPagesRoutingModule {}
