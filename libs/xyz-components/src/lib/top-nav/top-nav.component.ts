import { Component, OnInit } from '@angular/core';
import {pageTitle} from '@xyz/data'
// import {log, warn, onerror, debug, attention, sq} from 'x-utils-es'
@Component({
  selector: 'lib-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public pageTitle = pageTitle
  constructor() {
  }


  ngOnInit(): void {

  }

}
