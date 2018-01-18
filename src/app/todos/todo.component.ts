import { Component } from '@angular/core';

import { ChatService } from '../chat/chat.service';

import { Todo } from './todo.model';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent {
	constructor(private chatService: ChatService){};

  todo: Todo = {
		name: 'a todo',
		description: 'a description',
		user: 'Max',
		deadline: 'now',
		group: 'group1'
	};
}
