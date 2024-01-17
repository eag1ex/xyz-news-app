import {IMetaDataHtmlList} from './common.interface'

// example: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
export type TQueries = 'topstories' | 'beststories' | 'newstories' | 'user'
export type TStoryTypes = 'topstories' | 'beststories' | 'newstories'


export interface IUser {
    about: string
    created: number
    delay: number
    id: string
    karma: number
    submitted: Array<number>
}

export interface IMetadata{
    metadata: IMetaDataHtmlList[];
    id?: number;
}

export interface IStoryItem {
    id: number // The item's unique id.
    deleted?: boolean // true if the item is deleted.
    type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    by?: string // The username of the item's author.
    time?: number // Creation date of the item, in Unix Time.
    text?: string // The comment, story or poll text. HTML.
    dead?: boolean // true if the item is dead.
    parent?: number // The comment's parent: either another comment or the relevant story.
    poll?: number // The pollopt's associated poll.
    kids?: Array<number> // kids	The ids of the item's comments, in ranked display order.
    url?: string // The URL of the story.
    score?: number // The story's score, or the votes for a pollopt.
    title?: string // The title of the story, poll or job. HTML.
    parts?: Array<number> // A list of related pollopts, in display order.
    descendants?: number // In the case of stories or polls, the total comment count.
}

