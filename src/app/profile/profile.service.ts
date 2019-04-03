import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../auth/user.model';

@Injectable()
export class ProfileService {
  showing: boolean = false;

  currentUser: User = null; //temp for manual testing

  //get user email
  //get user chats and list those that are groups
  //get contacts and list those
  //get user

  showHide(){
    this.showing = !this.showing;
  }

  hide(){
    this.showing = false;
  }

  setManualUser(user: string){
    var newUser = new User(user, 'someemail' + user, [], [], []);
    this.currentUser = newUser;
    console.log("current user is " + this.currentUser.name);
  }
}
