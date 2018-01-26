import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { TodoContainerComponent } from './todo-container.component';
import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from './todo.component';

import { ChatService } from '../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TodoContainerComponent>;
let comp: TodoContainerComponent;
let chatService: ChatService;

describe(`TodoContainerComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoContainerComponent, TodoListComponent, TodoComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(TodoContainerComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain all todo lists', () => {
    let todoLists = comp.todoLists;
    expect(todoLists).to.exist;
  });


  /* snip */
});
