import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from './todo.component';

import { ChatService } from '../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TodoListComponent>;
let comp: TodoListComponent;
let chatService: ChatService;

describe(`TodoListComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });


  /* snip */
});
