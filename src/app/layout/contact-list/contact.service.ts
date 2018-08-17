import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../../auth/user.model';

@Injectable()
export class ContactService {
  addNewContactOccurred = new EventEmitter<User>();
  removeContactOccurred = new EventEmitter<User>();

  addNewContact(user: User){

  }

  handleCreate(user: User){
    this.addNewContactOccurred.emit(user);
  }

  removeContact(user: User){

  }

  handleRemove(user: User){
    this.removeContactOccurred.emit(user);
  }
}
