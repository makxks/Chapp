import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
	selector: 'logo-component',
	templateUrl: './logo.component.html',
	styleUrls: [String('./logo.component.sass')]
})

export class LogoComponent {
  constructor(private router: Router){}

  goHome(){
  }
}
