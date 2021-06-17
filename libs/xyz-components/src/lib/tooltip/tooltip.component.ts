import { ITooltipItem } from '@xyz/interfaces';
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { tooltipList } from '@xyz/data'
import { log } from 'x-utils-es'
import { Router } from '@angular/router';

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

    constructor(private router: Router) {
      // preset new toopit se selected
      this.tooltipList.forEach(n => {
        if (n.name === 'top')  n.selected = true

      })
    }

    get chip() {
        return this.chipList.get('chip')
    }

    public chipClicked(val: XTooltipItem): void {
      this.chipList.patchValue({chip: val})
    }

    ngOnInit(): void {
        this.chipList.get('chip').valueChanges.subscribe((n: XTooltipItem) => {
          n.selected = true
          this.router.navigate([`app/stories/${n.name}`]).then(nn => {
           // if (nn) log('navigated to', n)
          })
        })
    }
}
