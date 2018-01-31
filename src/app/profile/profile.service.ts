import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  showing: boolean = false;

  showHide(){
    this.showing = !this.showing;
  }
}
