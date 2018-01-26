import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { EditGroupChatComponent } from './edit-group-chat.component';
import { ChatService } from '../chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<EditGroupChatComponent>;
let comp: EditGroupChatComponent;
let chatService: ChatService;

describe(`EditGroupChatComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupChatComponent],
      imports: [FormsModule],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(EditGroupChatComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should be hidden', () => {
    expect(comp.display == 'none');
  });


  /* snip */
});
