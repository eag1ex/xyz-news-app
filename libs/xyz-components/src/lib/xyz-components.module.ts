import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@xyz/material'
import { LayoutComponent } from './layout/layout.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { FooterComponent } from './footer/footer.component'
import { TooltipComponent } from './tooltip/tooltip.component'
@NgModule({
    declarations: [TopNavComponent, FooterComponent, LayoutComponent, TooltipComponent],
    imports: [CommonModule, MaterialModule, MaterialModule, ReactiveFormsModule],
    exports: [TopNavComponent, FooterComponent, LayoutComponent],
})
export class XYZComponentsModule {}
