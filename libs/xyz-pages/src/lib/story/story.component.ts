import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { StoriesHttpService } from '@xyz/http'
import { IRouteParams, TStories, TStoryTypes, IStoryItem } from '@xyz/interfaces'
import { log } from 'x-utils-es'
import { tooltipList } from '@xyz/data'

interface ICurrentStory {
    name: TStories
    value: TStoryTypes
}

@Component({
    selector: 'lib-home',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit, OnDestroy {
    subscriptions: Array<any> = []
    public storyList: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers']
    private _currentStoryRoute: TStories
    public storyData: {response: IStoryItem[], paged: number, pagedTotal: number}
    constructor(private _route: ActivatedRoute, private storiesHttpService: StoriesHttpService) {
        this._route.paramMap.subscribe((d) => {
            const params: IRouteParams = (d as any).params

            if (params.story) {
                this.currentStoryRoute = params.story
                log('params.story', params.story)
            }
        })
    }

    /**
     * on story change unsub from last request
     */
    set currentStoryRoute(value) {
        this._currentStoryRoute = value
        const match = tooltipList.filter((n) => n.value === value)[0]
        if (match) this.subToCurrentStory(match as any)
    }

    get currentStoryRoute(): TStories {
        return this._currentStoryRoute
    }

    private subToCurrentStory(story: ICurrentStory): void {
        if (!story) return

        this.unsub()
        const s = this.storiesHttpService.stories$.subscribe((n) => {
          this.storyData = n
          log(n)
        })

        this.subscriptions.push(s)
        this.storiesHttpService.sub$.next({ type: story.value, paged: 2 })
    }

    public showDetail(story) {
        log('show detail')
    }

    private unsub(): void {
        // unsubscribe on change of story route
        this.subscriptions.forEach((sub, inx) => {
            try {
                sub.unsubscribe()
                log('unsubscribed!', inx)
            } catch (err) {}
            this.subscriptions.splice(inx, 1)
        })
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
