import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { ChatComponent } from './chat/chat.component';
import { ChatContainerComponent } from './chat/chat-container.component';
import { CreateGroupChatComponent } from './chat/chat-function-components/create-group-chat.component';
import { EditGroupChatComponent } from './chat/chat-function-components/edit-group-chat.component';
import { DeleteGroupChatComponent } from './chat/chat-function-components/delete-group-chat.component';

import { LogoComponent } from './layout/logo/logo.component';
import { HeaderComponent } from './layout/header/header.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { TabComponent } from './layout/tabs/tab.component';

import { ContactListComponent } from './layout/contact-list/contact-list.component';
import { ContactListItemComponent } from './layout/contact-list/contact-list-item.component';
import { AddContactComponent } from './layout/contact-list/contact-function-components/add-contact.component';
import { RemoveContactComponent } from './layout/contact-list/contact-function-components/remove-contact.component';

import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoComponent } from './todos/todo.component';
import { CreateTodoComponent } from './todos/todo-function-components/create-todo.component';
import { EditTodoComponent } from './todos/todo-function-components/edit-todo.component';
import { DeleteTodoComponent } from './todos/todo-function-components/delete-todo.component';

import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';

import { ChatService } from './chat/chat.service';
import { TodoService } from './todos/todo.service';
import { ProfileService } from './profile/profile.service';
import { ContactService } from './layout/contact-list/contact.service';
import { AuthService } from './auth/auth.service';

import { routing } from './app.routing';

@NgModule({
	declarations: [
		AppComponent,
		ChatComponent,
		ChatContainerComponent,
		CreateGroupChatComponent,
		EditGroupChatComponent,
		DeleteGroupChatComponent,
		LogoComponent,
		HeaderComponent,
		TabsComponent,
		TabComponent,
		ContactListComponent,
		ContactListItemComponent,
		AddContactComponent,
		RemoveContactComponent,
		TodoContainerComponent,
		TodoListComponent,
		TodoComponent,
		CreateTodoComponent,
		EditTodoComponent,
		DeleteTodoComponent,
		ProfileComponent,
		AuthComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		routing
	],
	providers: [
		ChatService,
		TodoService,
		ContactService,
		ProfileService,
		AuthService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
