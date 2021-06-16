import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { MetadataHttpService } from '@xyz/http'
import { IMetaDataHtmlList, IStoryItem } from '@xyz/interfaces'
import { isArray, log } from 'x-utils-es'


interface XStoryItem extends IStoryItem {
    showMore?: boolean
}

@Component({
    selector: 'lib-story-detail',
    templateUrl: './story-detail.component.html',
    styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit, OnChanges, OnDestroy {
    public storyDetail: XStoryItem
    subscriptions = []
    metadata: IMetaDataHtmlList[] = undefined // optional data if available
    constructor(private metadataHttpService: MetadataHttpService) {

    const s = this.metadataHttpService.meta$.subscribe(n => {
        log('metadata value', n.response.metadata)
        this.metadata = n.response.metadata
      }, err => {
        // of not data available
        this.metadata = null
      })
    this.subscriptions.push(s)
    }

    @Input() storyItem: XStoryItem

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.storyItem) {

          if (changes.storyItem.currentValue) {
            this.storyDetail = this.storyItem
            if (this.storyDetail.url) this.metadataHttpService.sub$.next(this.storyDetail.url)
          }
        }
    }

    /**
     * Check if our nested item meta.value ===[] is nested array
     */
    public metaItemArray(item: any): boolean{
      return isArray(item)
    }

    private unsub(): void {
      // unsubscribe on change of story route
      this.subscriptions.forEach((sub, inx) => {
          try {
              sub.unsubscribe()
              log('unsubscribed!', inx + 1)
          } catch (err) {}
          this.subscriptions.splice(inx, 1)
      })
  }

    ngOnInit(): void {}
    ngOnDestroy(): void {
      this.unsub()
    }
}
