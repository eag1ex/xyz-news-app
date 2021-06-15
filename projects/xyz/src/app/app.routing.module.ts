import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    loadChildren: () =>
      import('@xyz/xyz-pages').then((mod) => mod.ActPagesModule),
  },
  {
    path: 'app',
    redirectTo: `app/stories/top`,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'app/stories/top', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  // declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
