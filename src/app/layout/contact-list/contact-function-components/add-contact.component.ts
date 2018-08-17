import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact.service';

import { User } from '../../../auth/user.model';

@Component ({
	selector: 'add-new-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: [String('./add-contact.component.sass')]
})

export class AddContactComponent implements OnInit {
  display = 'none';

  constructor(private contactService: ContactService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onAddNewContactAccepted(user: User) {
    /*this.contactService.createGroup(chat)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.contactService.addNewContactOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
