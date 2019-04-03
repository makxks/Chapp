import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotificationComponent } from './notification.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<NotificationComponent>;
let comp: NotificationComponent;

describe(`NotificationComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(NotificationComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  /* snip */
});
