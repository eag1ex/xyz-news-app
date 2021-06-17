import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'x-utils-es';


@Component({
  selector: 'lib-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private _route: ActivatedRoute) {
    this._route.paramMap.subscribe((d) => {
     // log('error route',d)
    })
  }

  ngOnInit(): void {
  }

}
