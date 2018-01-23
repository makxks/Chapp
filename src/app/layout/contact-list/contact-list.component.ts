import { Component } from '@angular/core';

@Component ({
	selector: 'contact-list-component',
	templateUrl: './contact-list.component.html',
	styleUrls: [String('./contact-list.component.sass')]
})

export class ContactListComponent {
	contactGroups: string[] = ['group1', 'group2', 'group3'];

	contactUsers: string[] = ['user1', 'user2'];
}
