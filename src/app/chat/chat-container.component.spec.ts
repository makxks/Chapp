import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ChatContainerComponent } from './chat-container.component';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ChatContainerComponent>;
let comp: ChatContainerComponent;
let chatService: ChatService;

describe(`ChatContainerComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatContainerComponent, ChatComponent],
      imports: [FormsModule],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(ChatContainerComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(chatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain no tabs', () => {
    let tabs = comp.tabs;
    expect(tabs).to.have.lengthOf(0);
  });


  /* snip */
});
