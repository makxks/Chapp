import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';

import { Todo } from '../todo.model';

@Component ({
	selector: 'delete-todo',
	templateUrl: './delete-todo.component.html',
	styleUrls: [String('./delete-todo.component.sass')]
})

export class DeleteTodoComponent implements OnInit {
  display = 'none';

  constructor(private todoService: TodoService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  ondeleteTodoAccepted(todo: Todo) {
    /*this.todoService.createGroup(todo)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.todoService.deleteTodoOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
