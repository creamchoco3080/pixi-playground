import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './component/board/board.component';
import {PageComponent} from './component/page/page.component';
import {PixiService} from "./services/pixi.service";
import {LineComponent} from './component/line/line.component';
import { PointComponent } from './component/point/point.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PageComponent,
    LineComponent,
    PointComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [PixiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
