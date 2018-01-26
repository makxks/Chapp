import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CreateGroupChatComponent } from './create-group-chat.component';
import { ChatService } from '../chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<CreateGroupChatComponent>;
let comp: CreateGroupChatComponent;
let chatService: ChatService;

describe(`CreateGroupChatComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupChatComponent],
      imports: [FormsModule],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(CreateGroupChatComponent);
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
