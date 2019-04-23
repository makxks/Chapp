import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat/chat.service';
import { TodoService } from './todo.service';

import { Todo } from './todo.model';

@Component ({
	selector: 'todo-list-component',
	templateUrl: './todo-list.component.html',
	styleUrls: [String('./todo-list.component.sass')]
})

export class TodoListComponent implements OnInit {
	constructor(private chatService: ChatService, private todoService: TodoService){};

	ngOnInit(){
	}
}
