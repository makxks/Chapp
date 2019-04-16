import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { ContactService } from '../contact.service';
import { ProfileService } from '../../../profile/profile.service';
import { NotificationService } from '../../../notifications/notification.service';

import { User } from '../../../auth/user.model';

@Component ({
	selector: 'add-new-contact',
	templateUrl: './add-contact.component.html',
	styleUrls: [String('./add-contact.component.sass')]
})

export class AddContactComponent implements OnInit {
  display = 'none';
	addContactForm: FormGroup;

  constructor(private contactService: ContactService, private fb: FormBuilder, private profileService: ProfileService, private notificationService: NotificationService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  addNewContactSubmitted() {
		//find contact

		//if it exists, send notification

		//if not report error
		const newContact = new User(
			this.addContactForm.value.username,
			this.addContactForm.value.email,
			[],
			[],
			[]
		);
		//newContact.contactNames.push(this.profileService.currentUser.name);
    this.notificationService.addNewContact(newContact);
		this.display = 'none';

		this.addContactForm.reset();
	}

	ngOnInit(){
    this.contactService.addNewContactOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});

		this.addContactForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.required]
		})
	}
}
