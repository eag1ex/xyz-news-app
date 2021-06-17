import { Component, OnInit } from '@angular/core'
import {footerCaption} from '@xyz/data'
@Component({
    selector: 'lib-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    public footerCaption = footerCaption
    constructor() {}

    ngOnInit(): void {}
}
