import { Component } from '@angular/core';

import { TodoService } from './todo.service';

@Component ({
	selector: 'todo-container-component',
	templateUrl: './todo-container.component.html',
	styleUrls: [String('./todo-container.component.sass')]
})

export class TodoContainerComponent {
	constructor(private todoService: TodoService) {
  }

	todoLists: any[] = ['group1', 'group2', 'group3'];
}
