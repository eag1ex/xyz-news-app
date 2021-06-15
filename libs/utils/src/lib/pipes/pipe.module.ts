import { NgModule } from '@angular/core';
import { MyDatePipe } from './my-date.pipe';
import {HostNamePipe} from './hostname.pipe'
import { TrimPipe } from './trim.pipe';
@NgModule({
  declarations: [MyDatePipe, HostNamePipe, TrimPipe],
  exports: [MyDatePipe, HostNamePipe, TrimPipe]
})
export class PipeModule {}
