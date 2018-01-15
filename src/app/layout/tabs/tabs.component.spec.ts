import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { ChatComponent } from '../../chat/chat.component';

import { ChatService } from '../../chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<TabsComponent>;
let comp: TabsComponent;
let chatService: ChatService;

describe(`TabsComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, TabComponent, ChatComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{ path: '', component: ChatComponent } , { path: ':groupname', component: ChatComponent }]
        )],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(TabsComponent);
    comp = fixture.componentInstance;
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain no tab buttons at first', () => {
    let tabs = fixture.debugElement.queryAll(By.css('button'));

    expect(tabs).to.have.lengthOf(0);

    fixture.detectChanges();
  });


  /* snip */
});
