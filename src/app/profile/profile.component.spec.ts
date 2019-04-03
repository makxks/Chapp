import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';

import { ProfileService } from './profile.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<ProfileComponent>;
let comp: ProfileComponent;
let profileService: ProfileService;

describe(`ProfileComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [FormsModule],
      providers: [ProfileService]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    comp = fixture.componentInstance;
    profileService = fixture.debugElement.injector.get(ProfileService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should not be showing', () => {
    expect(profileService.showing == false);
  });


  /* snip */
});
