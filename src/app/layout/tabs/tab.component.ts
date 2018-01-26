import { Component, Input } from '@angular/core';

import { ChatService } from '../../chat/chat.service';

@Component ({
	selector: 'tab-component',
	templateUrl: './tab.component.html',
	styleUrls: [String('./tab.component.sass')]
})

export class TabComponent {
  @Input() name: string;
	newMessages: number = 0;
	constructor(private chatService: ChatService){}

	changeGroup(){
		this.chatService.selectGroup(this.name);
	}

	closeTab(){
		this.chatService.closeGroup(this.name);
	}
}
