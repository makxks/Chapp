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

  it('should send and recieve same text when selected', () => {
    let element = fixture.debugElement.query(By.css('div'));
    expect(element).to.not.exist;

    let selectGroup = chai.spy.on(chatService, 'selectGroup');
    selectGroup('group1');
    expect(selectGroup).to.have.been.called;
    comp.selected = true;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('div'));
    let sendMessage = chai.spy.on(comp, 'sendMessage');
    let button = fixture.debugElement.query(By.css('.message-button'));
    expect(element).to.exist;

    let input = fixture.debugElement.query(By.css('.message-input')).nativeElement;

    fixture.whenStable().then(() => {
      input.value = 'a message';
      expect(comp.message).to.equal('a message');
      button.triggerEventHandler('click', {});
      expect(sendMessage).to.have.been.called;
    })
  })


  /* snip */
});
