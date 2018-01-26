import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LogoComponent } from './layout/logo/logo.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { TabComponent } from './layout/tabs/tab.component';
import { HeaderComponent } from './layout/header/header.component';
import { ChatContainerComponent } from './chat/chat-container.component';
import { ContactListComponent } from './layout/contact-list/contact-list.component';
import { ContactListItemComponent } from './layout/contact-list/contact-list-item.component';
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoComponent } from './todos/todo.component';

import { ChatService } from './chat/chat.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;
let chatService: ChatService;

describe(`AppComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ChatComponent, LogoComponent, TabsComponent, HeaderComponent, ChatContainerComponent, TabComponent, ContactListComponent, ContactListItemComponent, TodoContainerComponent, TodoListComponent, TodoComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{ path: '', component: ChatComponent } , { path: ':groupname', component: ChatComponent }]
        )
      ],
      providers: [
        ChatService
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    chatService = fixture.debugElement.injector.get(ChatService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should contain a chat container', () => {
    let routerOutlet = fixture.debugElement.query(By.css('chat-container-component'));

    expect(routerOutlet).to.exist;
  })


  /* snip */
});
