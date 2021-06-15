import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { IStoryItem } from '@xyz/interfaces'
import { log } from 'x-utils-es'

interface XStoryItem extends IStoryItem {
    showMore?: boolean
}

@Component({
    selector: 'lib-story-detail',
    templateUrl: './story-detail.component.html',
    styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit, OnChanges {
    public storyDetail: XStoryItem
    constructor() {}

    @Input() storyItem: XStoryItem

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.storyItem) {

          if (changes.storyItem.currentValue) {
            this.storyDetail = this.storyItem
          }
        }
    }

    ngOnInit(): void {}
}
