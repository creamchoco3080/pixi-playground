import {Injectable} from "@angular/core";
import {Application} from 'pixi.js';

@Injectable()
export class PixiService {

  app: Application;

  constructor(){
    this.app = new Application({backgroundColor: 0x1099bb});
  }

}
