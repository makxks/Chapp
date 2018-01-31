import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ChatComponent } from './chat.component';

import { ChatService } from './chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ChatComponent>;
let comp: ChatComponent;
let chatService: ChatService;

describe(`ChatComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        ChatService,
        { provide: ActivatedRoute, useValue: { 'params': Observable.of([{ 'id': 1 }]) } }
      ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should start with an empty message array', () => {
    fixture.detectChanges();
    let messageArray = comp.messages;
    expect(messageArray.length).to.equal(0);
  });

  it('should connect to the chat service', () => {
    let connect = chai.spy.on(chatService, 'connect');
    comp.ngOnInit();
    expect(connect).to.have.been.called;
  });

  it('should be hidden at the start', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('div'));
    expect(element).to.not.exist;
  })

  /* snip */
});
