import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact.service';

import { User } from '../user.model';

@Component ({
	selector: 'remove-contact',
	templateUrl: './remove-contact.component.html',
	styleUrls: [String('./remove-contact.component.sass')]
})

export class RemoveContactComponent implements OnInit {
  display = 'none';

  constructor(private contactService: ContactService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onRemoveContactAccepted(user: User) {
    /*this.contactService.createGroup(chat)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.contactService.removeContactOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
