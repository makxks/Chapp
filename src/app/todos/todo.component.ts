import { Component } from '@angular/core';

import { Todo } from './todo.model';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent {
  todo: Todo = {};
}
