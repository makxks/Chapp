import { Component } from '@angular/core';

import { NotificationService } from './notification.service';

@Component ({
	selector: 'notification-list-component',
	templateUrl: './notification-list.component.html',
	styleUrls: [String('./notification-list.component.sass')]
})

export class NotificationListComponent {

	constructor(private notificationService: NotificationService){}

}
