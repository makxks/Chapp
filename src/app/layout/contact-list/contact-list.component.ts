import { Component } from '@angular/core';

@Component ({
	selector: 'contact-list-component',
	templateUrl: './contact-list.component.html',
	styleUrls: [String('./contact-list.component.sass')]
})

export class ContactListComponent {
	contacts: string[] = ['group1', 'group2', 'group3'];
}
