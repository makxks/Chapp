import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../../chat/chat.service';

import { Chat } from '../../chat/chat.model';

@Component ({
	selector: 'tabs-component',
	templateUrl: './tabs.component.html',
	styleUrls: [String('./tabs.component.sass')]
})

export class TabsComponent {
	constructor(private router: Router, private chatService: ChatService){}

	tabs: string[] = this.chatService.openGroups;
}
