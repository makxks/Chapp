import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotificationListComponent } from './notification-list.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<NotificationListComponent>;
let comp: NotificationListComponent;

describe(`NotificationListComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationListComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(NotificationListComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  /* snip */
});
