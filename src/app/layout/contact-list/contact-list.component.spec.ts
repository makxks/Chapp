import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ContactListComponent } from './contact-list.component';
import { ContactListItemComponent } from './contact-list-item.component';

import { ChatService } from '../../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ContactListComponent>;
let comp: ContactListComponent;
let chatService: ChatService;

describe(`ContactListComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent, ContactListItemComponent],
      imports: [
        FormsModule
			],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(ContactListComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain 3 test items', () => {
		fixture.detectChanges();
    let tabs = fixture.debugElement.queryAll(By.css('button'));
    expect(tabs).have.lengthOf(3);
  });


  /* snip */
});
