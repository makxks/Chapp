import { Component, OnChanges, OnInit } from '@angular/core';

import { ChatService } from './chat.service';

@Component ({
	selector: 'chat-container-component',
	templateUrl: './chat-container.component.html',
	styleUrls: [String('./chat-container.component.sass')]
})

export class ChatContainerComponent implements OnInit {
  tabs: any[] = ['group1', 'group2', 'group3'];

	constructor(private chatService: ChatService){}

	ngOnInit(){
		console.log(this.tabs);
	}
}
