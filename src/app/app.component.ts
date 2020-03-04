// License: (C) Entangled Cognition. 2019-2020

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eslint-sample-test';
  constructor() {
    console.log('am i working?');
  }
  ngOnInit(): void {
    console.log();
  }
  some(): void {}
  hello(): void {
    console.log();
  }
}
