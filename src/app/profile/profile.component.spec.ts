import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ProfileComponent>;
let comp: ProfileComponent;

describe(`CreateTodoComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should not be showing', () => {
    expect(comp.showing == false);
  });


  /* snip */
});
