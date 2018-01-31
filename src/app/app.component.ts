import { Component } from '@angular/core';

import { ProfileService } from './profile/profile.service';

@Component ({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: [String('./app.component.sass')]
})

export class AppComponent {
	constructor(private profileService: ProfileService){}
}
