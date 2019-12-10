import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../auth/user.model';
import { Chat } from '../chat/chat.model';

@Injectable()
export class ProfileService {
  showing: boolean = false;

  currentUser: User = null;

  //get user email
  //get user chats and list those that are groups
  //get contacts and list those
  //get user

  setUser(user: User){
    this.currentUser = user;
    //this can then be used on relevant pages to get all the needed information if it has not been loaded yet... i think

    console.log(this.currentUser.name);
    console.log(this.currentUser.email);
  }

  showHide(){
    this.showing = !this.showing;
  }

  hide(){
    this.showing = false;
  }
}
