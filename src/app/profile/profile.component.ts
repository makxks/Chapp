import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../layout/contact-list/contact.service';
import { ProfileService } from './profile.service';

@Component ({
	selector: 'profile-component',
	templateUrl: './profile.component.html',
	styleUrls: [String('./profile.component.sass')]
})

export class ProfileComponent {
	constructor(private contactService: ContactService, private profileService: ProfileService){}
}
