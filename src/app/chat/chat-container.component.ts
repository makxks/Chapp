import { Component } from '@angular/core';

import { ChatService } from './chat.service';
import { ProfileService } from '../profile/profile.service';

import { Chat } from './chat.model';

@Component ({
	selector: 'chat-container-component',
	templateUrl: './chat-container.component.html',
	styleUrls: [String('./chat-container.component.sass')]
})

export class ChatContainerComponent {

	constructor(private chatService: ChatService){}
}
