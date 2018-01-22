import { Component } from '@angular/core';

@Component ({
	selector: 'todo-container-component',
	templateUrl: './todo-container.component.html',
	styleUrls: [String('./todo-container.component.sass')]
})

export class TodoContainerComponent {
	todoLists: any[] = ['group1', 'group2', 'group3'];
}
