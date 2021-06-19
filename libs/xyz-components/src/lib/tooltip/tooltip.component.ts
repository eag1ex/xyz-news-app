import { ITooltipItem } from '@xyz/interfaces';
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { tooltipList } from '@xyz/data'
import { Router } from '@angular/router';
import { RouterEventService } from '@xyz/services';
import { log } from 'x-utils-es';
import { debounceTime } from 'rxjs/operators';

interface XTooltipItem extends ITooltipItem {
  selected?: boolean;
}

@Component({
    selector: 'lib-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
    public tooltipList: XTooltipItem[] = tooltipList

    chipList = new FormGroup({
        chip: new FormControl({})
    })

    constructor(
      private eventServive: RouterEventService,
      private router: Router) {
        this.eventServive.routeChange((params => {
          if (params.story){
            this.select(params.story)
          }
        }))
    }

    get chip(): any {
        return this.chipList.get('chip')
    }

    public chipClicked(val: XTooltipItem): void {
      this.chipList.patchValue({chip: val})
    }

    private select(value: string): void{
      this.tooltipList.forEach(nn => {
        if (nn.name === value) nn.selected = true
        else nn.selected = false
      })
    }

    ngOnInit(): void {
        this.chipList.get('chip').valueChanges.pipe(debounceTime(500)).subscribe((n: XTooltipItem) => {

          // toogle selection
          this.select( n.name)
          this.router.navigate([`app/stories/${n.name}`]).then(nn => {
           // if (nn) log('navigated to', n)
          })
        })
    }
}
