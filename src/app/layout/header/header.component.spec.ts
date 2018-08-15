import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

import { ProfileService } from '../../profile/profile.service';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<HeaderComponent>;
let comp: HeaderComponent;
let profileService: ProfileService;

describe(`HeaderComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [ProfileService]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;
    profileService = fixture.debugElement.injector.get(ProfileService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should call show and hide menu on button click', () => {
    let button = fixture.debugElement.query(By.css('#menu'));
    let openProfile = chai.spy.on(button, 'showHideProfile');
    let profileServiceShow = chai.spy.on(profileService, 'showHide')

    button.triggerEventHandler('click', {});

    expect(openProfile).to.have.been.called;
    expect(profileServiceShow).to.have.been.called;

    expect(profileService.showing == true);

    button.triggerEventHandler('click', {});

    expect(profileService.showing == false);
  })

  /* snip */
});
