import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'stories/:story', // top, best, new
    loadChildren: () =>
      import('./story/story.module').then((mod) => mod.StoryModule),
      runGuardsAndResolvers: 'paramsChange'
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((mod) => mod.ErrorModule),
      runGuardsAndResolvers: 'paramsChange',
  },
  { path: '**', redirectTo: 'stories/top' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BypartPagesRoutingModule {}
