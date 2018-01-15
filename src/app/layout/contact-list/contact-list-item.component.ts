import { Component, Input } from '@angular/core';

import { ChatService } from '../../chat/chat.service';

@Component ({
	selector: 'contact-list-item-component',
	templateUrl: './contact-list-item.component.html',
	styleUrls: [String('./contact-list-item.component.sass')]
})

export class ContactListItemComponent {
  @Input() groupname: string;

  constructor(private chatService: ChatService){}

  selectContact(){
    this.chatService.selectContact(this.groupname);
  }
}
