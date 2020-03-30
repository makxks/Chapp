import { Component, Input, OnInit } from '@angular/core';

import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

import { ContactService } from '../layout/contact-list/contact.service';

import { Chat } from '../chat/chat.model';

@Component ({
	selector: 'notification-component',
	templateUrl: './notification.component.html',
	styleUrls: [String('./notification.component.sass')]
})

export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
	@Input() chat: Chat = null;

	year: any;
	month: any;
	date: any;

	hours:any;
	minutes: any;

  constructor(private notificationService: NotificationService, private contactService: ContactService){}

	ngOnInit(){
		this.year = new Date(this.notification.timeSent).getFullYear();
		this.month = new Date(this.notification.timeSent).getMonth()+1;
		this.date = new Date(this.notification.timeSent).getDate();

		this.hours = new Date(this.notification.timeSent).getHours();
		this.minutes = new Date(this.notification.timeSent).getMinutes();
	}
}
