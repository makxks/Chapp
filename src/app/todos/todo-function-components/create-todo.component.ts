import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';

import { Todo } from '../todo.model';

@Component ({
	selector: 'create-todo',
	templateUrl: './create-todo.component.html',
	styleUrls: [String('./create-todo.component.sass')]
})

export class CreateTodoComponent implements OnInit {
  display = 'none';

  constructor(private todoService: TodoService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onCreateTodoAccepted(todo: Todo) {
    /*this.todoService.createGroup(todo)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.todoService.createTodoOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
