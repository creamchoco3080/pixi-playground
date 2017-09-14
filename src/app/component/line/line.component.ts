import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Graphics} from 'pixi.js';
import {Line, Point} from "../../model/model";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, OnChanges, OnDestroy{

  @Input() line: Line;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('change in line component', changes);
    this.draw();
  }

  ngOnDestroy(){
    console.log('line destroyed');
    this.line.removeChildren();
  }

  onPointEvent(newPoint: Point){
    // console.log('point added', newPoint);
    // let lastPoint;
    if(this.line.points.length > 0){
      this.draw();
      // TODO: find a way to draw just new portion of the line
      // lastPoint = this.line.points[this.line.points.length-1];
      // this.line.graphics.moveTo(lastPoint.x, lastPoint.y);
      // this.line.graphics.lineTo(newPoint.x, newPoint.y);
    }
  }

  draw(){
    this.line.graphics = new Graphics();
    this.line.removeChildren();
    for(let i = 0; i < this.line.points.length - 1; i++){
      this.line.graphics.lineStyle(5, 0xffffff, 1);
      this.line.graphics.moveTo(this.line.points[i].x, this.line.points[i].y);
      this.line.graphics.lineTo(this.line.points[i+1].x, this.line.points[i+1].y);
    }
    this.line.addChild(this.line.graphics);
  }

}
