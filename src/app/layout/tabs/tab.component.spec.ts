import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { TabComponent } from './tab.component';
import { ChatService } from '../../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TabComponent>;
let comp: TabComponent;
let chatService: ChatService;

describe(`TabComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent],
      imports: [
        FormsModule
      ],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(TabComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should open the tab when clicked', () => {
    let tab = fixture.debugElement.query(By.css('button'));
    let openTab = chai.spy.on(tab, 'changeGroup');

    tab.triggerEventHandler('click', {});
    expect(openTab).to.have.been.called;
  });


  /* snip */
});
