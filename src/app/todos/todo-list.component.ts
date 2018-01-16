import { Component } from '@angular/core';

@Component ({
	selector: 'todo-list-component',
	templateUrl: './todo-list.component.html',
	styleUrls: [String('./todo-list.component.sass')]
})

export class TodoListComponent {
	todoList: any[] = [];
}
