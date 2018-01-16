import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { TodoContainerComponent } from './todos/todo-container.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoComponent } from './todos/todo.component';

import { ChatService } from './chat/chat.service';

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
		TodoContainerComponent,
		TodoListComponent,
		TodoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [
		ChatService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
