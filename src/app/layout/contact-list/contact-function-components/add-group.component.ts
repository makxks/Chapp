import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { ContactService } from '../contact.service';
import { ProfileService } from '../../../profile/profile.service';
import { NotificationService } from '../../../notifications/notification.service';

import { User } from '../../../auth/user.model';

@Component ({
	selector: 'add-new-group',
	templateUrl: './add-group.component.html',
	styleUrls: [String('./add-group.component.sass')]
})

export class AddGroupComponent implements OnInit {
  display = 'none';
	createGroupForm: FormGroup;
	users: User[] = [];
	selectedUsernames: string[] = [];

  constructor(private contactService: ContactService, private fb: FormBuilder, private profileService: ProfileService, private notificationService: NotificationService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  createNewGroupSubmitted() {
    var users = this.users;
		this.contactService.addGroupToOwner(this.createGroupForm.value.groupname);
    this.notificationService.addNewGroup(users, this.createGroupForm.value.groupname);
		//create group with current user as only member
		this.display = 'none';

		this.createGroupForm.reset();
	}

	ngOnInit(){
    this.contactService.addGroupOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});

		this.createGroupForm = this.fb.group({
			groupname: ['', Validators.required],
			users: [[], Validators.required]
		});
	}

	updateCheckedUsers(user){
		if(this.users.includes(user)){
			for(var i=0; i<this.selectedUsernames.length; i++){
				if(this.selectedUsernames[i] == user.name){
					this.selectedUsernames.splice(i,1);
				}
			}
			for(var i=0; i<this.users.length; i++){
				if(this.users[i] == user){
					this.users.splice(i,1);
				}
			}
		}
		else{
			this.users.push(user);
			this.selectedUsernames.push(user.name);
		}
	}
}
