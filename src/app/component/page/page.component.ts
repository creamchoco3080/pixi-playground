import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from "../../model/model";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() page: Page;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('changes in page component', changes);
    for(let i = 0; i < this.page.lines.length; i++){
      this.page.addChild(this.page.lines[i]);
    }
  }

  ngAfterViewInit(){
  }

}
