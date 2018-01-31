import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class ContactService {
  addNewContactOccurred = new EventEmitter<User>();
  removeContactOccurred = new EventEmitter<User>();

  addNewContact(user){

  }

  handleCreate(user){
    this.addNewContactOccurred.emit(user);
  }

  removeContact(user){

  }

  handleRemove(user){
    this.removeContactOccurred.emit(user);
  }
}
