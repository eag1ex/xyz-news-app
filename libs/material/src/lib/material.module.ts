/**
 * import required material design module
 */

import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'
import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
// import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select'

const ANGULAR_MATERIAL_MODULES = [
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    // MatMenuModule,
    MatButtonModule,
    // MatCardModule,
    MatChipsModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    MatDividerModule,
]

@NgModule({
    imports: [ANGULAR_MATERIAL_MODULES],
    exports: [ANGULAR_MATERIAL_MODULES],
})
export class MaterialModule {}
