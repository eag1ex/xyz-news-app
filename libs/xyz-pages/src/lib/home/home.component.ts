import { Component, OnInit } from '@angular/core';
import { StoriesHttpService } from '@xyz/http';
import { log } from 'x-utils-es';

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storiesHttpService: StoriesHttpService) {
      this.storiesHttpService.stories$.subscribe(n => {
        log(n)
      })
      this.storiesHttpService.sub$.next({type: 'beststories', paged: 2})
  }

  ngOnInit(): void {
  }

}
