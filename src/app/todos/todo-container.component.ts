import { Component } from '@angular/core';

@Component ({
	selector: 'todo-container-component',
	templateUrl: './todo-container.component.html',
	styleUrls: [String('./todo-container.component.sass')]
})

export class TodoContainerComponent {
	todolists: any[] = ['a list'];
}
