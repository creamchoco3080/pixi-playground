import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Line, Page, Point} from "../../model/model";
import {PixiService} from "../../services/pixi.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() pages: Page[];

  @ViewChild('canvas') canvas;

  clicked: boolean = false;
  currentLine: Line;

  constructor(private pixiApp: PixiService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // attach pixi app view to canvas
    this.canvas.nativeElement.appendChild(this.pixiApp.app.view);
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('changes in board component', changes);
    this.pixiApp.app.stage.removeChildren();
    for(let i = 0; i < this.pages.length; i++){
      this.pixiApp.app.stage.addChild(this.pages[i]);
    }
  }

  onMouseDown(event){
    this.clicked = true;
    this.currentLine = new Line([new Point(event.clientX, event.clientY)]);
    this.pages[0].lines.push(this.currentLine);
    this.pages[0].addChild(this.currentLine);
  }

  onMouseMove(event){
    if(this.clicked){
      // console.log(event.clientX, event.clientY);
      this.currentLine.points.push(new Point(event.clientX, event.clientY));
    }
  }

  onMouseUp(event){
    this.clicked = false;
  }

}
