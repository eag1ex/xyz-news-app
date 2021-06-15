import { ITooltipItem } from '@xyz/interfaces';
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { tooltipList } from '@xyz/data'
import { log } from 'x-utils-es'
import { Router } from '@angular/router';

@Component({
    selector: 'lib-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
    public tooltipList = tooltipList

    chipList = new FormGroup({
        chip: new FormControl({})
    })

    constructor(private router: Router) {}

    get chip() {
        return this.chipList.get('chip')
    }

    public chipClicked(val: ITooltipItem): void {
      this.chipList.patchValue({chip: val})
    }

    ngOnInit(): void {
        this.chipList.get('chip').valueChanges.subscribe((n: ITooltipItem) => {
          this.router.navigate([`app/${n.value}`]).then(nn => {
            if (nn) log('navigated to', n)
          })
        })
    }
}
