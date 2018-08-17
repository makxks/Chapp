import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from './auth.service';

import { User } from './user.model';

@Component ({
	selector: 'auth-component',
	templateUrl: './auth.component.html',
	styleUrls: [String('./auth.component.sass')]
})

export class AuthComponent implements OnInit {
	signupForm: FormGroup;
	loginForm: FormGroup;

  displayType = 'login';

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  modalCancelled() {
		this.authService.showHideAuthModal('none');
	}

  onSignup() {
		const signupUser = new User(
			this.signupForm.value.username,
			this.signupForm.value.email,
			[],
			[],
			[]
		);
		return signupUser;
	}

  onLogin() {
		const loginUser = new User(
			this.signupForm.value.username,
			"",
			[],
			[],
			[]
		);
		return loginUser;
  }

	ngOnInit(){
    this.authService.authCallOccurred
      .subscribe(
				(result: any) => {
					this.authService.showHideAuthModal('block');
				});

		this.signupForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.compose([
              Validators.required,
              this.isEmail
            ])],
			password: ['', Validators.compose([
              Validators.required,
              Validators.minLength(6)
            ])],
			confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])]
		});

		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

  displayTypeChange(type: string){
    this.displayType = type;
  }

	isEmail(control: FormControl): {[s: string]: boolean} {
        if ((!control.value.match(/^\w.+^\w\.cn$/)) && (!control.value.match(/^\w.+?@^\w\.com$/))) {
            return {noEmail: true};
        }
    }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
      if (!this.signupForm) {
          return {passwordsNotMatch: true};

      }
      if (control.value !== this.signupForm.controls['password'].value) {
          return {passwordsNotMatch: true};
      }
  }
}
