import { Component } from '@angular/core';

@Component ({
	selector: 'todo-component',
	templateUrl: './todo.component.html',
	styleUrls: [String('./todo.component.sass')]
})

export class TodoComponent {
  todo: any = {};
}
