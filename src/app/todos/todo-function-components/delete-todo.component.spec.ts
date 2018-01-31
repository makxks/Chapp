import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DeleteTodoComponent } from './delete-todo.component';
import { TodoService } from '../todo.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<DeleteTodoComponent>;
let comp: DeleteTodoComponent;
let todoService: TodoService;

describe(`DeleteTodoComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTodoComponent],
      imports: [FormsModule],
      providers: [
        TodoService
      ]
    });
    fixture = TestBed.createComponent(DeleteTodoComponent);
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
