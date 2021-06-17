/**
 * NOTE This is my own RX store implementation, and  use on other angular projects
 * XYXstates implements RxStore logic, used to store data instead of new http request.
 */

import { Injectable, isDevMode } from '@angular/core'
import { IStoriesReps, IMetaResp } from '@xyz/interfaces'
import { RxStore } from '@xyz/utils'
import { Observable } from 'rxjs'
import { copy } from 'x-utils-es'
interface IStoriesPaged {
    [ref: string]: IStoriesReps // storyName+paged
}

interface ImetaStored {
    [url: string]: IMetaResp
}

interface IState {
    stories?: IStoriesPaged
    meta?: ImetaStored
}

const initialState: IState = {
    stories: {},
    meta: {},
}

@Injectable({
    providedIn: 'root',
})
export class XYXstates extends RxStore<IState> {
    constructor() {
        super(initialState, { debug: isDevMode() })
    }

    /**
     * Set each new story with paged number
     */
    setStory(story: IStoriesReps, storyName: string, paged: number): void {
        const ref = storyName + paged
        const state = copy(this.getState().stories) as any
        if (!state[ref]) {
            state[ref] = story
            this.setState({ stories: state })
        }
    }

    /**
     * Return cached story by paged number
     */
    story$(storyName: string, paged: number): Observable<IStoriesReps> {
        const ref = storyName + paged
        return this.select((state) => {
            return state.stories[ref] || undefined
        })
    }

    /**
     * Set last queried meta so we dont have to do it again
     */
    setMeta(url: string, meta: IMetaResp): void {
        const state = copy(this.getState().meta) as any
        if (!state[url]) {
            state[url] = meta
            this.setState({ meta: state })
        }
    }

    /**
     * Return cached meta by url
     */
    meta$(url: string): Observable<IMetaResp> {
        return this.select((state) => {
            return state.meta[url] || undefined
        })
    }
}
