import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { TodoContainerComponent } from './todo-container.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TodoContainerComponent>;
let comp: TodoContainerComponent;

describe(`TodoContainerComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoContainerComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(TodoContainerComponent);
    comp = fixture.componentInstance;
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
