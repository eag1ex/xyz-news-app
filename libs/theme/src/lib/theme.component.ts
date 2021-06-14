import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-theme',
  template: `
    <p>
      theme works!
    </p>
  `,
  styles: [
  ]
})
export class ThemeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
