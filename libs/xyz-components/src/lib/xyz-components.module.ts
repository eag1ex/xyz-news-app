import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@xyz/material'
import { LayoutComponent } from './layout/layout.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { FooterComponent } from './footer/footer.component'
import { TooltipComponent } from './tooltip/tooltip.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { PaginationComponent } from './pagination/pagination.component'

@NgModule({
    declarations: [TopNavComponent, FooterComponent, LayoutComponent, TooltipComponent, StoryDetailComponent, PaginationComponent],
    imports: [CommonModule, MaterialModule, MaterialModule, ReactiveFormsModule, JwPaginationModule],
    exports: [TopNavComponent, FooterComponent, LayoutComponent, StoryDetailComponent, PaginationComponent],
})
export class XYZComponentsModule {}
