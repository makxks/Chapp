import { Component, Input } from '@angular/core';

import { TodoService } from './todo.service';

import { Todo } from './todo.model';
import { User } from '../auth/user.model';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent {
	@Input() todo: Todo = new Todo('Max', 'Test', 'Max', 'Now', 'group1', false, '', new User('max', 'an@email.email', [], [], []));

	constructor(private todoService: TodoService){
		
	};
}
