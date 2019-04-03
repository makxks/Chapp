import { Component } from '@angular/core';

import { User } from '../../auth/user.model';
import { Chat } from '../../chat/chat.model';

import { ChatService } from '../../chat/chat.service';
import { ProfileService } from '../../profile/profile.service';
import { ContactService } from './contact.service';

@Component ({
	selector: 'contact-list-component',
	templateUrl: './contact-list.component.html',
	styleUrls: [String('./contact-list.component.sass')]
})

export class ContactListComponent {

	constructor(private chatService: ChatService, private profileService: ProfileService, private contactService: ContactService){}

	//createPrivateChat(otherUser: User){

	//}

	addContact(){
		this.contactService.handleAddContact();
	}

	addGroup([]: User[]){

	}
}
