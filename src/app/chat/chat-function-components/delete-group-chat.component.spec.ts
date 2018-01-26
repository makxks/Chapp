import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DeleteGroupChatComponent } from './delete-group-chat.component';
import { ChatService } from '../chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<DeleteGroupChatComponent>;
let comp: DeleteGroupChatComponent;
let chatService: ChatService;

describe(`DeleteGroupChatComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGroupChatComponent],
      imports: [FormsModule],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(DeleteGroupChatComponent);
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
