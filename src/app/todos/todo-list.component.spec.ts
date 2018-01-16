import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { TodoListComponent } from './todo-list.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TodoListComponent>;
let comp: TodoListComponent;

describe(`TodoContainerComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain a todo list', () => {
    let list = comp.todoList;
    expect(list).to.exist;
  });


  /* snip */
});
