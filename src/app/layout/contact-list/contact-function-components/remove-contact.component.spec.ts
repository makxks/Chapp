import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RemoveContactComponent } from './remove-contact.component';
import { ContactService } from '../contact.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<RemoveContactComponent>;
let comp: RemoveContactComponent;
let contactService: ContactService;

describe(`RemoveContactComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveContactComponent],
      imports: [FormsModule],
      providers: [
        ContactService
      ]
    });
    fixture = TestBed.createComponent(RemoveContactComponent);
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
