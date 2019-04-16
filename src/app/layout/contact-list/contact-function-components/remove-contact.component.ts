import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact.service';
import { ProfileService } from '../../../profile/profile.service';

import { User } from '../../../auth/user.model';

@Component ({
	selector: 'remove-contact',
	templateUrl: './remove-contact.component.html',
	styleUrls: [String('./remove-contact.component.sass')]
})

export class RemoveContactComponent implements OnInit {
	user: User;
  display = 'none';

  constructor(private contactService: ContactService, private profileService: ProfileService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onRemoveContactAccepted(user: User) {
		var users = { remove: user, sender: this.profileService.currentUser };
    this.contactService.emitRemoveContact(users);
		this.modalCancelled();
	}

	ngOnInit(){
    this.contactService.removeContactOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
					this.user = result;
				});
	}
}
