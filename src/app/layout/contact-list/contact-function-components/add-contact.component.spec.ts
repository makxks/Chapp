import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AddContactComponent } from './add-contact.component';
import { ContactService } from '../contact.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<AddContactComponent>;
let comp: AddContactComponent;
let contactService: ContactService;

describe(`AddContactComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      imports: [FormsModule],
      providers: [
        ContactService
      ]
    });
    fixture = TestBed.createComponent(AddContactComponent);
    comp = fixture.componentInstance;
    contactService = fixture.debugElement.injector.get(ContactService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should be hidden', () => {
    expect(comp.display == 'none');
  });


  /* snip */
});
