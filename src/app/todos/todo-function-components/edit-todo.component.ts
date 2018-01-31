import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';

import { Todo } from '../todo.model';

@Component ({
	selector: 'edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: [String('./edit-todo.component.sass')]
})

export class EditTodoComponent implements OnInit {
  display = 'none';

  constructor(private todoService: TodoService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onEditTodoAccepted(todo: Todo) {
    /*this.todoService.createGroup(todo)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.todoService.editTodoOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
