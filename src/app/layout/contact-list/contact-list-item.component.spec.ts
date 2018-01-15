import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContactListItemComponent } from './contact-list-item.component';

import { ChatService } from '../../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ContactListItemComponent>;
let comp: ContactListItemComponent;
let chatService: ChatService;

describe(`ContactListItemComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListItemComponent],
      imports: [
        FormsModule
      ],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(ContactListItemComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should create a tab when clicked and/or open that tab', () => {
    let tab = fixture.debugElement.query(By.css('button'));
    let selectContact = chai.spy.on(tab, 'selectContact');

    tab.triggerEventHandler('click', {});
    expect(selectContact).to.have.been.called;
  });


  /* snip */
});
