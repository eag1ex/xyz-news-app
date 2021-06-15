import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesHttpService } from '@xyz/http'
import { IRouteParams, TStories, TStoryTypes, IStoryItem, ITooltipItem } from '@xyz/interfaces'
import { log } from 'x-utils-es'
import { tooltipList } from '@xyz/data'


const currentRoute = (str: string): ITooltipItem => {
    const r = tooltipList.filter(n => n.name === str)[0]
    return (r && str) ? r : null
}

interface ICurrentStory {
    name: TStories
    value: TStoryTypes
}
interface XStoryItem extends IStoryItem {
    showMore?: boolean;
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
    public storyData: {response: XStoryItem[], paged: number, pagedTotal: number}
    constructor(
        private router: Router,
        private _route: ActivatedRoute, private storiesHttpService: StoriesHttpService) {
        this._route.paramMap.subscribe((d) => {
            const params: IRouteParams = (d as any).params
            const rt = currentRoute(params.story)
            if (rt) {
                this.storyData = undefined
                this.currentStoryRoute = rt.name as TStories
                log('params.story', params.story)
            } else{
                log('no match')
                this.router.navigate(['app/error']);
            }
        })
    }

    /**
     * on story change unsub from last request
     */
    set currentStoryRoute(name) {
        this._currentStoryRoute = name
        const match = tooltipList.filter((n) => n.name === name)[0]
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
          log('new story data set', n)
        })

        this.subscriptions.push(s)
        this.storiesHttpService.sub$.next({ type: story.value, paged: 2 })
    }

    public storySelected(story: XStoryItem): void{
        log('item selected', story)
    }

    public showDetail(story: XStoryItem, index: number): void {
       // let showMore =  this.storyData.response[index].showMore
        this.storyData.response[index].showMore = !this.storyData.response[index].showMore
        log('show detail', this.storyData.response[index].showMore)
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
