import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { ChatComponent } from './chat/chat.component';
import { ChatContainerComponent } from './chat/chat-container.component';

import { LogoComponent } from './layout/logo/logo.component';
import { HeaderComponent } from './layout/header/header.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { TabComponent } from './layout/tabs/tab.component';

import { ContactListComponent } from './layout/contact-list/contact-list.component';
import { ContactListItemComponent } from './layout/contact-list/contact-list-item.component';
import { AddContactComponent } from './layout/contact-list/contact-function-components/add-contact.component';
import { RemoveContactComponent } from './layout/contact-list/contact-function-components/remove-contact.component';
import { AddGroupComponent } from './layout/contact-list/contact-function-components/add-group.component';
import { EditGroupComponent } from './layout/contact-list/contact-function-components/edit-group.component';
import { GroupDetailsComponent } from './layout/contact-list/contact-function-components/group-details.component';
import { LeaveGroupComponent } from './layout/contact-list/contact-function-components/leave-group.component';

import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoComponent } from './todos/todo.component';
import { CreateTodoComponent } from './todos/todo-function-components/create-todo.component';
import { EditTodoComponent } from './todos/todo-function-components/edit-todo.component';
import { DeleteTodoComponent } from './todos/todo-function-components/delete-todo.component';

import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';

import { NotificationListComponent } from './notifications/notification-list.component';
import { NotificationComponent } from './notifications/notification.component';
import { NotificationService } from './notifications/notification.service';

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
		LogoComponent,
		HeaderComponent,
		TabsComponent,
		TabComponent,
		ContactListComponent,
		ContactListItemComponent,
		AddContactComponent,
		RemoveContactComponent,
		AddGroupComponent,
		EditGroupComponent,
		GroupDetailsComponent,
		LeaveGroupComponent,
		TodoContainerComponent,
		TodoListComponent,
		TodoComponent,
		CreateTodoComponent,
		EditTodoComponent,
		DeleteTodoComponent,
		ProfileComponent,
		AuthComponent,
		NotificationListComponent,
		NotificationComponent,
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
		NotificationService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
