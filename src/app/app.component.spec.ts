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
import { ProfileComponent } from './profile/profile.component';

import { ChatService } from './chat/chat.service';
import { ProfileService } from './profile/profile.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy, stub } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;
let chatService: ChatService;
let profileService: ProfileService;
let profile: ProfileComponent;

describe(`AppComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ChatComponent, LogoComponent, TabsComponent, HeaderComponent, ChatContainerComponent, TabComponent, ContactListComponent, ContactListItemComponent, TodoContainerComponent, TodoListComponent, TodoComponent, ProfileComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{ path: '', component: ChatComponent }]
        )
      ],
      providers: [
        ChatService,
        ProfileService
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    chatService = fixture.debugElement.injector.get(ChatService);
    profileService = fixture.debugElement.injector.get(ProfileService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });


  /* snip */
});
