import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { MetadataHttpService } from '@xyz/http'
import { IMetaDataHtmlList, IStoryItem } from '@xyz/interfaces'
import { isArray, log, sq } from 'x-utils-es'

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
    private ngReady = sq()
    subscriptions = []
    metadata: IMetaDataHtmlList[] = undefined // optional data if available
    constructor(private metadataHttpService: MetadataHttpService) {

        const s = this.metadataHttpService.meta$.subscribe(
            (n) => {
                this.metadata = n.response.metadata
                // we have the same subscription for each detail, but only need it once
                s.unsubscribe()
                this.ngReady.then(n=>{
                    this.loading.emit({ loading: false, id: this.storyItem.id })
                })
                
            },
            (err) => {
                // of not data available
                this.metadata = null
                s.unsubscribe()

                this.ngReady.then(n=>{
                  this.loading.emit({ loading: false, id: this.storyItem.id })
                })
            }
        )

        this.ngReady.then(n=>{
            if(this.storyItem.url) this.loading.emit({loading:true, id: this.storyItem.id})
        })
      

        this.subscriptions.push(s)
    }

    @Input() storyItem: XStoryItem
    // show fancy loading icon on story page
    @Output() loading = new EventEmitter<{loading:boolean,id?:number}>();

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
    public metaItemArray(item: any): boolean {
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

    ngOnInit(): void {
        this.ngReady.resolve(true)
    }
    ngOnDestroy(): void {
        this.unsub()
    }
}
