import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { TodoComponent } from './todo.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TodoComponent>;
let comp: TodoComponent;

describe(`TodoComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TodoComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should be able to hold a todo of type Todo', () => {
    let todo = comp.todo;
    expect(todo).to.exist;
  });


  /* snip */
});
