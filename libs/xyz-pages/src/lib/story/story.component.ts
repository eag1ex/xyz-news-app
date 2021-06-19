import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { StoriesHttpService } from '@xyz/http'
import { IRouteParams, TStories, TStoryTypes, IStoryItem } from '@xyz/interfaces'
import { log } from 'x-utils-es'
import { currentRoute } from '@xyz/utils'
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'

interface ICurrentStory {
    name: TStories
    value: TStoryTypes
}

interface XStoryItem extends IStoryItem {
    showMore?: boolean
    loading?: boolean
}

@Component({
    selector: 'lib-home',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit, OnDestroy, AfterContentInit {
    showDetailAction = new FormControl({})
    paginationSetup = {
        loadingNext: false, // when changing pagination
        ready: false, // set once {storyData} loaded
        initialPage: 1, // paged
        maxPages: 10, // max pagination to display
        pageSize: 15, // this is the setting on the server, currently max to 15 per call
        allItems: [], // metadata[] approximate number of available items
    }
    private subscriptions: Array<any> = []
    public pagedItems: Array<any> = []

    public storyList: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers']
    private _currentStoryRoute: TStories
    public storyData: { response: XStoryItem[]; paged: number; pagedTotal: number }
    constructor(private router: Router, private _route: ActivatedRoute, private storiesHttpService: StoriesHttpService) {
        this._route.paramMap.subscribe((d) => {
            const params: IRouteParams = (d as any).params
            const rt = currentRoute(params.story)
            if (rt) {
                // reset pagination state on new page route
                this.paginationSetup.initialPage = 1

                this.storyData = undefined
                this.currentStoryRoute = rt.name as TStories
                log('params.story', params.story)
            } else {
                log('no match')
                this.router.navigate(['app/error'])
            }
        })

        //  handling clicks to display <lib-story-detail/> component, debounce recursive clicks :))
        this.showDetailAction.valueChanges.pipe(debounceTime(600)).subscribe((n: { story: XStoryItem; index: number }) => {
            if (this.storyData.response[n.index]) {
                this.storyData.response[n.index].showMore = !this.storyData.response[n.index].showMore
            }
        })
    }

    /**
     * on story change unsub from last request
     */
    set currentStoryRoute(name) {
        this._currentStoryRoute = name
        const match = currentRoute(name) // tooltipList.filter((n) => n.name === name)[0]
        if (match) this.subToCurrentStory(match as any)
    }

    get currentStoryRoute(): TStories {
        return this._currentStoryRoute
    }

    private subToCurrentStory(story: ICurrentStory): void {
        if (!story) return

        this.unsub()

        const s = this.storiesHttpService.stories$.subscribe(
            (n) => {
                this.storyData = n

                // pagination setting
                const size = this.storyData.response.length * this.storyData.pagedTotal

                // do not update pagination on last paged index, since items size is less
                if (this.storyData.paged !== this.storyData.pagedTotal) {
                    this.paginationSetup.allItems = Array(size)
                        .fill(0)
                        .map((x, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
                }

                this.paginationSetup.initialPage = this.storyData.paged
                this.paginationSetup.ready = true
                this.paginationSetup.loadingNext = false
            },
            (err) => {
                // route to error page
                this.router.navigate(['app/error'])
            }
        )

        this.subscriptions.push(s)

        this.storiesHttpService.sub$.next({ type: story.value, paged: this.paginationSetup.initialPage })
    }

    /**
     * Handle preload icon display on @output event
     */
    public onLoadingStoryDetail({ loading = undefined, id = undefined }): void {
        this.storyData.response.forEach((story) => {
            if (story.id === id && story !== undefined) {
                story.loading = loading
            }
        })
    }

    public storySelected(story: XStoryItem): void {}

    public pagedOnChangePage({ currentPage, lastPage }): void {
        // do not execute if on the same previous index
        if (this.paginationSetup.initialPage === currentPage) return
        else {
            this.paginationSetup.loadingNext = true

            const val = currentRoute(this.currentStoryRoute)
            this.storiesHttpService.sub$.next({ type: val.value as any, paged: currentPage })
        }
    }

    public showDetail(story: XStoryItem, index: number): void {
        this.showDetailAction.patchValue({ story, index })
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
    ngAfterContentInit(): void {
        // if we have mobile update padgination
        if (window.outerWidth < 415) {
            this.paginationSetup.maxPages = 6
        } else {
            // back to default
            this.paginationSetup.maxPages = 10
        }
    }
    ngOnDestroy(): void {}
}
