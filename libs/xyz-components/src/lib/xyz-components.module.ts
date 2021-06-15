import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@xyz/material'
import { LayoutComponent } from './layout/layout.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { FooterComponent } from './footer/footer.component'
import { TooltipComponent } from './tooltip/tooltip.component';
import { StoryDetailComponent } from './story-detail/story-detail.component'
@NgModule({
    declarations: [TopNavComponent, FooterComponent, LayoutComponent, TooltipComponent, StoryDetailComponent],
    imports: [CommonModule, MaterialModule, MaterialModule, ReactiveFormsModule],
    exports: [TopNavComponent, FooterComponent, LayoutComponent, StoryDetailComponent],
})
export class XYZComponentsModule {}
