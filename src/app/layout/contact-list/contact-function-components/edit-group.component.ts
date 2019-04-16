import { Component, Input, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Chat } from '../../../chat/chat.model';
import { User } from '../../../auth/user.model';

import { ChatService } from '../../../chat/chat.service';
import { ContactService } from '../contact.service';
import { NotificationService } from '../../../notifications/notification.service';

@Component ({
	selector: 'edit-group',
	templateUrl: './edit-group.component.html',
	styleUrls: [String('./edit-group.component.sass')]
})

export class EditGroupComponent implements OnInit {
  chat: Chat = new Chat("",null,[],false,[]);
	editGroupForm: FormGroup;
  display: string = "none";
  possibleNewUsers: User[] = [];
	selectedUsers: User[] = [];
	contacts: User[] = [];

	constructor(private chatService: ChatService, private contactService: ContactService, private notificationService: NotificationService, private fb: FormBuilder){};

  ngOnInit(){
    this.chatService.editGroupOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
          this.chat = result;
					this.contacts = this.contactService.contactUsers;

          for(var i=0; i<this.contacts.length; i++){
						var found = false;
						for(var j=0; j<this.chat.users.length; j++){
	            if(this.chat.users[j].email == this.contacts[i].email){
	              found = true;
	            }
						}
						if(!found){
							this.possibleNewUsers.push(this.contacts[i]);
						}
          }
				});

  		this.editGroupForm = this.fb.group({
  			groupname: [''],
  			users: [[]]
  		});
		}

		modalCancelled(){
			this.display = "none";
		}

    updateCheckedUsers(user: User){
  		if(this.selectedUsers.includes(user)){
  			for(var i=0; i<this.selectedUsers.length; i++){
  				if(this.selectedUsers[i] == user){
  					this.selectedUsers.splice(i,1);
  				}
  			}
  		}
  		else{
  			this.selectedUsers.push(user);
  		}
			console.log(this.selectedUsers);
  	}

		checkIfUserIsSelected(user: User){
			for(var i=0 ; i<this.selectedUsers.length; i++){
				if(this.selectedUsers[i].email == user.email){
					return true;
				}
			}
			return false;
		}

    editGroupSubmitted() {
			if(this.editGroupForm.value.groupname == "" || !this.editGroupForm.value.groupname){
				this.editGroupForm.value.groupname = this.chat.name;
			}
      this.notificationService.editGroup(this.editGroupForm.value.groupname, this.selectedUsers);
  		//create group with current user as only member
  		this.contactService.emitEditGroup(this.chat, this.editGroupForm.value.groupname);
  		this.display = 'none';

  		this.editGroupForm.reset();
  	}
}
