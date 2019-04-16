import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../auth/user.model';

import { ChatService } from '../../chat/chat.service';
import { ProfileService } from '../../profile/profile.service';

@Component ({
	selector: 'tab-component',
	templateUrl: './tab.component.html',
	styleUrls: [String('./tab.component.sass')]
})

export class TabComponent implements OnInit {
  @Input() name: string;
	displayName: string;
	newMessages: number = 0;
	constructor(private chatService: ChatService, private profileService: ProfileService){}

	changeGroup(){
		this.chatService.selectGroup(this.name);
	}

	closeTab(){
		this.chatService.closeGroup(this.name);
	}

	ngOnInit(){
		var name1: string = this.name.split(' and ')[0];
		var name2: string = this.name.split(' and ')[1];
		if(name1 == this.profileService.currentUser.name){
			this.displayName = name2;
		}
		else{
			this.displayName = name1;
		}
	}
}
