import {Container, Graphics} from 'pixi.js';
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Line extends Container {
  points: Point[];
  graphics: Graphics;

  constructor(points?: Point[]) {
    super();

    if (points) {
      this.points = points;
    }
    else {
      this.points = [];
      this.points.push(new Point(Math.random() * 800, Math.random() * 800));
      this.points.push(new Point(Math.random() * 800, Math.random() * 800));
    }
  }
}

export class Page extends Container {
  lines: Line[];
  numLines: number = 3;

  constructor(lines?: Line[]) {
    super();
    if (lines) {
      this.lines = lines;
    }
    else {
      this.lines = [];
      for (let i = 0; i < this.numLines; i++) {
        this.lines.push(new Line());
      }
    }
  }
}

export class Board {
  pages: Page[];
  constructor(pages?: Page[]){
    if(pages){
      this.pages = pages;
    }
    else {
      this.pages = [];
    }
  }
}
