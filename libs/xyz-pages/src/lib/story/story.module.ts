import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { Routes, RouterModule } from '@angular/router';
import {MaterialModule} from '@xyz/material';
import { PipeModule } from '@xyz/utils';

// import { ThemeModule } from '@buypart/theme';

export const ROUTES: Routes = [{ path: '', component: StoryComponent }];
@NgModule({
  declarations: [StoryComponent],
  imports: [
    PipeModule,
   // ThemeModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StoryModule { }
