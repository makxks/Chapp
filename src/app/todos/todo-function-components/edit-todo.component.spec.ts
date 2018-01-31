import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EditTodoComponent } from './edit-todo.component';
import { TodoService } from '../todo.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<EditTodoComponent>;
let comp: EditTodoComponent;
let todoService: TodoService;

describe(`EditTodoComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      imports: [FormsModule],
      providers: [
        TodoService
      ]
    });
    fixture = TestBed.createComponent(EditTodoComponent);
    comp = fixture.componentInstance;
    todoService = fixture.debugElement.injector.get(TodoService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should be hidden', () => {
    expect(comp.display == 'none');
  });


  /* snip */
});
