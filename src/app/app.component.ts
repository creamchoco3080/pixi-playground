import {Component, OnInit} from '@angular/core';

import {Application} from 'pixi.js';

import {Board, Page, Line, Point} from "./model/model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  app: Application;

  viewModel: Board;
  currentLineIndex: number = 0;

  clicked: boolean = false;

  constructor() {
    this.createViewModel();
    // setInterval(() => {
    //   this.changeViewModel();
    // }, 1000);
  }

  ngOnInit() {
  }

  createViewModel() {
    this.viewModel = new Board([new Page([])]);
  }

  changeViewModel() {
    // add page, line
    // this.viewModel.pages = [...this.viewModel.pages, new Page([
    //   new Line([
    //     new Point(0,0),
    //     new Point(100,100),
    //     new Point(200,300),
    //     new Point(0,0)
    //   ])
    // ])];

    // delete page, line and add new page, line
    // let point = new Point(Math.random()*800,Math.random()*600);
    // this.viewModel.pages = [new Page([
    //   new Line([
    //     point,
    //     new Point(Math.random()*800,Math.random()*600),
    //     new Point(Math.random()*800,Math.random()*600),
    //     point
    //   ])
    // ])];
  }
}
