import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import paginate from 'jw-paginate'
import { log } from 'x-utils-es'

// source https://jasonwatmore.com/post/2020/10/03/angular-10-simple-pagination-example
@Component({
    selector: 'lib-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
    constructor() {}

    @Input() items: Array<{ id: number; name: string }>
    @Output() changePage = new EventEmitter<{currentPage: number,lastPage:boolean}>(true)
    @Input() initialPage = 1
    @Input() pageSize = 0
    @Input() maxPages = 0

    pager: any = {}

    ngOnInit(): void {
        // set page if items array isn't empty
        // if (this.items && this.items.length) {
        //     this.setPage(this.initialPage)
        // }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // reset page if items array has changed
        if (changes.items){
            if (changes.items.currentValue !== changes.items.previousValue) {
                this.setPage(this.initialPage)
            }
        }

    }

    setPage(page: number): void {

        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
        // get new page of items from items array
        // const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1)
       let lastPage = this.pager.currentPage === this.pager.totalPages
       this.changePage.emit({currentPage: this.pager.currentPage, ...(lastPage ? {lastPage:true}:{lastPage:false})})
        
       
    }
}
