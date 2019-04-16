import { Component, Input } from '@angular/core';

@Component ({
	selector: 'leave-group',
	templateUrl: './leave-group.component.html',
	styleUrls: [String('./leave-group.component.sass')]
})

export class LeaveGroupComponent {
  @Input() groupname: string;

  display = 'none';

  constructor(){}
}
