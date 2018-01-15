import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoComponent } from './logo.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<LogoComponent>;
let comp: LogoComponent;

describe(`LogoComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(LogoComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should call goHome on logo is click', () => {
    let logo = fixture.debugElement.query(By.css('#logo'));
    let goHome = chai.spy.on(comp, 'goHome');

    logo.triggerEventHandler('click', {});
    expect(goHome).to.have.been.called();
  })


  /* snip */
});
