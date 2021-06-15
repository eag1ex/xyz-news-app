import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// top, best, new
const routes: Routes = [
  {
    path: ':story',
    loadChildren: () =>
      import('./story/story.module').then((mod) => mod.StoryModule),
      runGuardsAndResolvers: 'paramsChange',
    // NOTE some resolvers can be added here when we use real api and state management
    // resolve: {
    //   homeProducts: HomeResolver
    //   },
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((mod) => mod.ErrorModule),
  },
  // { path: 'home', redirectTo: 'top' },
  // { path: '**', redirectTo: 'top' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BypartPagesRoutingModule {}


// {
//   path: 'work/:project',
//   // component: SingleProjectComponent,
//   loadChildren: './single-project/single-project.module#SingleProjectModule',
//  //  resolve: {
//  //   singleProduct: SingleProductResolver
//  //   },
//    runGuardsAndResolvers: 'paramsChange',
// },