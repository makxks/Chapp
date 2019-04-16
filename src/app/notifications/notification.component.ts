import { Component, Input } from '@angular/core';

import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

import { ContactService } from '../layout/contact-list/contact.service';

import { Chat } from '../chat/chat.model';

@Component ({
	selector: 'notification-component',
	templateUrl: './notification.component.html',
	styleUrls: [String('./notification.component.sass')]
})

export class NotificationComponent {
  @Input() notification: Notification;
	@Input() chat: Chat = null;

  constructor(private notificationService: NotificationService, private contactService: ContactService){}
}
